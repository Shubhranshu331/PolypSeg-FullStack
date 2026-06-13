"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import LoadingLogo from "./LoadingLogo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function ResultPanel({ title, src, badge }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-ink-400 tracking-widest uppercase">
          {title}
        </span>
        {badge && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-highlight/15 text-amber-highlight font-semibold">
            {badge}
          </span>
        )}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/png;base64,${src}`}
        alt={title}
        className="w-full rounded-xl border border-ink-900/10 object-cover"
        style={{ aspectRatio: "1", objectFit: "cover" }}
      />
    </div>
  );
}

export default function Demo() {
  const [preview,   setPreview]   = useState(null);
  const [file,      setFile]      = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [result,    setResult]    = useState(null);
  const [error,     setError]     = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const f = acceptedFiles[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".tif", ".tiff"] },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024,
  });

  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(`${API_URL}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 90000,
      });
      setResult(res.data);
    } catch (err) {
      const msg = err.response?.data?.error
        || (err.code === "ECONNABORTED" ? "Request timed out — backend may be waking up. Try again in 30 seconds." : null)
        || "Could not reach the backend. Make sure it is running.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <section id="demo" className="section-pad bg-cream-50 relative overflow-hidden">
      {/* Subtle radial */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12 text-center">
          <span className="tag mb-4 inline-flex mx-auto">Live Demo</span>
          <h2 className="heading-lg text-ink-900">Upload. Analyse. See.</h2>
          <p className="body-lg mt-4 max-w-xl mx-auto">
            Upload any colonoscopy image and the Attention U-Net will segment the polyp region in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── Left: Upload panel ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Drop zone */}
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200
                ${isDragActive
                  ? "border-ink-900 bg-cream-200 scale-[1.01]"
                  : "border-ink-900/20 hover:border-ink-900/50 hover:bg-cream-100 bg-cream-50"
                }`}
            >
              <input {...getInputProps()} />

              {preview ? (
                /* Preview */
                <div className="flex flex-col items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-xl border border-ink-900/10"
                  />
                  <p className="text-sm text-ink-400">
                    {file?.name}
                    <span className="ml-2 text-ink-200">
                      ({(file?.size / 1024).toFixed(0)} KB)
                    </span>
                  </p>
                  <p className="text-xs text-ink-300">Click or drag to replace</p>
                </div>
              ) : (
                /* Empty state */
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="w-16 h-16 rounded-2xl bg-ink-900/5 flex items-center justify-center">
                    <svg className="w-8 h-8 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-ink-700">
                      {isDragActive ? "Drop it here!" : "Drop your colonoscopy image"}
                    </p>
                    <p className="text-sm text-ink-300 mt-1">
                      JPG, PNG, TIF · Max 20 MB
                    </p>
                  </div>
                  <span className="btn-outline text-xs py-2 px-4 pointer-events-none">
                    Browse Files
                  </span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePredict}
                disabled={!file || loading}
                className="btn-primary flex-1 py-4 text-sm disabled:opacity-40 disabled:cursor-not-allowed justify-center"
              >
                {loading ? "Analysing…" : "Analyse Image →"}
              </button>
              {(file || result) && (
                <button onClick={handleReset} className="btn-outline py-4 px-5 text-sm">
                  Reset
                </button>
              )}
            </div>

            {/* Note about cold start */}
            <p className="text-xs text-ink-300 text-center">
              ⚡ First request may take 60–90 s as the model loads on HuggingFace Spaces.
            </p>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* ── Right: Results panel ────────────────────────────────────────── */}
          <div>
            {/* Loading */}
            {loading && (
              <div className="card-cream p-12 flex flex-col items-center justify-center gap-6 min-h-[400px]">
                <LoadingLogo size={100} />
              </div>
            )}

            {/* Results */}
            {!loading && result && (
              <div className="flex flex-col gap-6 animate-fade-in">
                {/* Metrics strip */}
                <div className="flex gap-4">
                  <div className={`flex-1 rounded-xl p-4 text-center border ${
                    result.metrics.polyp_detected
                      ? "bg-amber-highlight/10 border-amber-highlight/30"
                      : "bg-cream-100 border-ink-900/10"
                  }`}>
                    <div className="text-2xl font-black text-ink-900">
                      {result.metrics.polyp_detected ? "⚠️ Polyp" : "✅ Clear"}
                    </div>
                    <div className="text-xs text-ink-400 mt-1 tracking-widest uppercase">Detection</div>
                  </div>
                  <div className="flex-1 rounded-xl p-4 text-center bg-cream-100 border border-ink-900/10">
                    <div className="text-2xl font-black text-ink-900">
                      {result.metrics.polyp_coverage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-ink-400 mt-1 tracking-widest uppercase">Coverage</div>
                  </div>
                  <div className="flex-1 rounded-xl p-4 text-center bg-cream-100 border border-ink-900/10">
                    <div className="text-2xl font-black text-ink-900">
                      {result.metrics.polyp_pixels.toLocaleString()}
                    </div>
                    <div className="text-xs text-ink-400 mt-1 tracking-widest uppercase">Polyp Pixels</div>
                  </div>
                </div>

                {/* Image panels */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ResultPanel title="Original" src={result.original} />
                  <ResultPanel
                    title="Predicted Mask"
                    src={result.mask}
                    badge="Binary"
                  />
                  <ResultPanel
                    title="Overlay"
                    src={result.overlay}
                    badge={result.metrics.polyp_detected ? "Polyp highlighted" : "No polyp"}
                  />
                </div>

                {/* Explanation */}
                <div className="card-cream p-4 text-xs text-ink-400 leading-relaxed">
                  <strong className="text-ink-700">How to read this:</strong> The mask (centre)
                  shows white pixels where the model detected polyp tissue. The overlay (right)
                  shows the original image with polyp regions highlighted in amber. Coverage % is
                  the fraction of the image classified as polyp.
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && !result && !error && (
              <div className="card-cream p-12 flex flex-col items-center justify-center gap-4 min-h-[400px] text-center">
                <div className="w-20 h-20 rounded-full bg-ink-900/5 flex items-center justify-center text-4xl">
                  🔬
                </div>
                <p className="font-semibold text-ink-700">Results will appear here</p>
                <p className="text-sm text-ink-300 max-w-xs">
                  Upload a colonoscopy image and click Analyse to see the segmentation mask and overlay.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
