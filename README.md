# PolypSeg AI — Colonoscopy Polyp Segmentation

<div align="center">

![PolypSeg Banner](https://img.shields.io/badge/Attention%20U--Net-Medical%20Imaging%20AI-F5A623?style=for-the-badge)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.16.1-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0.3-000000?style=for-the-badge&logo=flask&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Full-stack AI web application for colonoscopy polyp segmentation using Attention U-Net.**

[Live Demo](https://polypseg.vercel.app) · [Dataset](https://www.kaggle.com/datasets/shubhranshu331/colonoscopy-images) · [Portfolio](https://portfolio-pied-seven-64.vercel.app/)

</div>

---

## What It Does

Upload any colonoscopy image → Attention U-Net segments polyp regions → returns:

- ✅ Binary segmentation mask
- ✅ Amber-highlighted overlay on original image
- ✅ Polyp coverage percentage
- ✅ Polyp pixel count
- ✅ Polyp detected / clear status

---

## Model Performance

| Metric | Score |
|--------|-------|
| Test Dice Score | **76.81%** |
| Test IoU Score | **69.01%** |
| Architecture | Attention U-Net |
| Input Size | 256 × 256 × 3 (RGB) |
| Output | 256 × 256 × 1 (Binary Mask) |
| Loss Function | BCE + Dice Loss |
| Dataset | CVC-ClinicDB (612 frames) |
| Framework | TensorFlow 2.16 / Keras |

---

## Why This Matters

Colorectal cancer is the **third most common cancer** worldwide. Up to **25% of polyps are missed** during standard colonoscopy due to human fatigue and poor visibility. Early detection increases survival rate to **90%+**.

This model acts as a reliable AI second opinion for clinicians — flagging polyp regions for review without replacing the doctor.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, Tailwind CSS, Three.js |
| Backend | Flask, Gunicorn |
| ML Model | TensorFlow/Keras, Attention U-Net |
| Image Processing | Pillow, NumPy, tifffile |
| Frontend Hosting | Vercel |
| Backend Hosting | HuggingFace Spaces (Docker) |
| Dataset | CVC-ClinicDB (Kaggle) |

---

## Folder Structure
PolypSeg-FullStack/
├── backend/
│   ├── app.py                  Flask API + /predict endpoint
│   ├── requirements.txt        Python dependencies
│   ├── Dockerfile              HuggingFace Docker config
│   ├── .python-version         Pins Python 3.11.9
│   └── best_model.keras        Trained Attention U-Net (Git LFS)
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js
│   │   │   ├── page.js
│   │   │   └── globals.css
│   │   └── components/
│   │       ├── PageLoader.jsx   Full screen loading animation
│   │       ├── LoadingLogo.jsx  Demo section loader
│   │       ├── Navbar.jsx       Responsive navbar + hamburger menu
│   │       ├── Hero.jsx         3D floating cubes + headline
│   │       ├── About.jsx        Project context + stats
│   │       ├── HowItWorks.jsx   Pipeline explanation
│   │       ├── ModelStats.jsx   Animated performance counters
│   │       ├── Demo.jsx         Upload + results (3 panel)
│   │       ├── TechStack.jsx    Technologies used
│   │       └── Footer.jsx       Links + credits
│   ├── package.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── .env.example
│
└── README.md

---

## Local Setup

### Backend

```bash
cd backend
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (Mac/Linux)
source venv/bin/activate

pip install -r requirements.txt
python app.py
# Running at http://localhost:5000
```

Test: open `http://localhost:5000` → should see `{"status": "ok"}`

### Frontend

```bash
cd frontend
npm install

# Create env file (Windows Notepad → Save As → All Files → .env.local)
# Content:
NEXT_PUBLIC_API_URL=http://localhost:5000

npm run dev
# Open http://localhost:3000
```

---

## Deploy Backend to HuggingFace Spaces

1. Go to [huggingface.co](https://huggingface.co) → New Space → Docker SDK → Public
2. Add a `Dockerfile` to your backend folder
3. Push backend folder to the Space repo using git
4. HuggingFace builds the Docker container automatically
5. API live at: `https://Shubhranshu331-polypseg-api.hf.space`

> ⚠️ HuggingFace free tier gives 16GB RAM — perfect for TensorFlow models.

---

## Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project → Import repo
2. Set Root Directory: `frontend`
3. Add environment variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://Shubhranshu331-polypseg-api.hf.space`
4. Deploy → get URL: `https://polypseg.vercel.app`

---

## API Reference

### `GET /`
Health check
```json
{ "status": "ok", "message": "PolypSeg API is running" }
```

### `POST /predict`
Upload colonoscopy image for segmentation.

**Request:** `multipart/form-data` with key `image` (JPG, PNG, TIF)

**Response:**
```json
{
  "original": "<base64 PNG>",
  "mask":     "<base64 PNG>",
  "overlay":  "<base64 PNG>",
  "metrics": {
    "polyp_pixels":   1234,
    "total_pixels":   65536,
    "polyp_coverage": 1.88,
    "polyp_detected": true
  }
}
```

---

## Dataset

**CVC-ClinicDB** — 612 colonoscopy frames with ground truth polyp masks.

Available on Kaggle: [shubhranshu331/colonoscopy-images](https://www.kaggle.com/datasets/shubhranshu331/colonoscopy-images)

---

## Model Training

The Attention U-Net model was trained in a separate repository.

Training code, notebooks, and experiments: [Polyp Image Segmentation — Attention U-Net](https://github.com/Shubhranshu331/Polyp--Image_segmentation-UNET-)

Includes:
- Data preprocessing pipeline
- Attention U-Net architecture implementation
- Training loop with BCE + Dice loss
- Evaluation metrics (Dice, IoU)
- Model export to `.keras` format

---

## Author

Built by **Shubhranshu** — [Portfolio](https://portfolio-pied-seven-64.vercel.app/) · [GitHub](https://github.com/Shubhranshu331)
