import os
import io
import base64
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageFile
import PIL
import tifffile

PIL.Image.MAX_IMAGE_PIXELS = None
ImageFile.LOAD_TRUNCATED_IMAGES = True

# ── Lazy model loading ────────────────────────────────────────────────────────
model = None

def load_model():
    global model
    if model is None:
        import tensorflow as tf
        from tensorflow.keras import backend as K

        def dice_coef(y_true, y_pred, smooth=1e-6):
            y_true_f = K.flatten(y_true)
            y_pred_f = K.flatten(y_pred)
            intersection = K.sum(y_true_f * y_pred_f)
            return (2.0 * intersection + smooth) / (K.sum(y_true_f) + K.sum(y_pred_f) + smooth)

        def dice_loss(y_true, y_pred):
            return 1.0 - dice_coef(y_true, y_pred)

        def bce_dice_loss(y_true, y_pred):
            bce = tf.keras.losses.binary_crossentropy(y_true, y_pred)
            return bce + dice_loss(y_true, y_pred)

        def iou_metric(y_true, y_pred, smooth=1e-6):
            y_pred_bin = tf.cast(y_pred > 0.5, tf.float32)
            intersection = K.sum(y_true * y_pred_bin, axis=[1, 2, 3])
            union = K.sum(y_true, axis=[1, 2, 3]) + K.sum(y_pred_bin, axis=[1, 2, 3]) - intersection
            return K.mean((intersection + smooth) / (union + smooth))

        custom_objects = {
            "bce_dice_loss": bce_dice_loss,
            "dice_coef":     dice_coef,
            "iou_metric":    iou_metric,
        }

        model_path = os.environ.get("MODEL_PATH", "best_model.keras")
        model = tf.keras.models.load_model(model_path, custom_objects=custom_objects)
        print(f"[INFO] Model loaded from {model_path}")
    return model


# ── Flask app ─────────────────────────────────────────────────────────────────
app = Flask(__name__)
CORS(app)

IMG_SIZE = 256


def preprocess_image(pil_img):
    img = pil_img.convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE), Image.LANCZOS)
    arr = np.array(img, dtype=np.float32) / 255.0
    return np.expand_dims(arr, axis=0)


def mask_to_base64(mask_arr):
    mask_uint8 = (mask_arr * 255).astype(np.uint8)
    pil_mask = Image.fromarray(mask_uint8, mode="L")
    buf = io.BytesIO()
    pil_mask.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")


def mask_to_base64_rgb(arr_float):
    uint8 = (arr_float * 255).astype(np.uint8)
    pil = Image.fromarray(uint8, mode="RGB")
    buf = io.BytesIO()
    pil.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")


def overlay_to_base64(orig_arr, mask_arr):
    overlay = (orig_arr * 255).astype(np.uint8).copy()
    polyp_pixels = mask_arr > 0.5
    overlay[polyp_pixels, 0] = np.clip(overlay[polyp_pixels, 0] * 0.45 + 255 * 0.55, 0, 255).astype(np.uint8)
    overlay[polyp_pixels, 1] = np.clip(overlay[polyp_pixels, 1] * 0.45 + 180 * 0.55, 0, 255).astype(np.uint8)
    overlay[polyp_pixels, 2] = np.clip(overlay[polyp_pixels, 2] * 0.45 + 0   * 0.55, 0, 255).astype(np.uint8)
    pil_overlay = Image.fromarray(overlay, mode="RGB")
    buf = io.BytesIO()
    pil_overlay.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")


def compute_metrics(mask_arr):
    pred_bin = (mask_arr > 0.5).astype(np.float32)
    polyp_pct = float(np.mean(pred_bin) * 100)
    polyp_pixels = int(np.sum(pred_bin))
    total_pixels = int(pred_bin.size)
    return {
        "polyp_pixels":   polyp_pixels,
        "total_pixels":   total_pixels,
        "polyp_coverage": round(polyp_pct, 2),
        "polyp_detected": polyp_pixels > 50,
    }


# ── Routes ────────────────────────────────────────────────────────────────────

@app.route("/")
def root():
    return jsonify({"status": "ok", "message": "PolypSeg API is running"})


@app.route("/health")
def health():
    return jsonify({"status": "healthy"})


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided."}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename."}), 400

    try:
        file_bytes = file.read()
        print(f"[DEBUG] Received file: {file.filename}, size: {len(file_bytes)} bytes")

        try:
            pil_img = Image.open(io.BytesIO(file_bytes))
            pil_img.load()
        except Exception:
    # Fallback for tricky TIF formats
            import tifffile
            arr = tifffile.imread(io.BytesIO(file_bytes))
            pil_img = Image.fromarray(arr)

        orig_resized = pil_img.convert("RGB").resize((IMG_SIZE, IMG_SIZE), Image.LANCZOS)
        orig_arr = np.array(orig_resized, dtype=np.float32) / 255.0

        inp = preprocess_image(pil_img)
        m = load_model()
        pred = m.predict(inp, verbose=0)[0]
        mask_arr = pred[:, :, 0]

        orig_b64    = mask_to_base64_rgb(orig_arr)
        mask_b64    = mask_to_base64(mask_arr)
        overlay_b64 = overlay_to_base64(orig_arr, mask_arr)
        metrics     = compute_metrics(mask_arr)

        return jsonify({
            "original": orig_b64,
            "mask":     mask_b64,
            "overlay":  overlay_b64,
            "metrics":  metrics,
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)