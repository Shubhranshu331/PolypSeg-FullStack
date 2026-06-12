"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(target, duration, start) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(parseFloat((progress * target).toFixed(2)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

export default function ModelStats() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const dice   = useCountUp(76.81, 2000, visible);
  const iou    = useCountUp(69.01, 2000, visible);
  const params = useCountUp(31,    1500, visible);

  const stats = [
    { label: "Test Dice Score",   value: `${dice.toFixed(2)}%`,     desc: "Overlap between predicted and true mask" },
    { label: "Test IoU Score",    value: `${iou.toFixed(2)}%`,      desc: "Intersection over Union" },
    { label: "Model Parameters",  value: `~${Math.round(params)}M`, desc: "Trainable parameters in Attention U-Net" },
    { label: "Input Size",        value: "256×256",                 desc: "RGB colonoscopy frames" },
    { label: "Output",            value: "Binary Mask",             desc: "Per-pixel polyp probability > 0.5" },
    { label: "Dataset",           value: "CVC-ClinicDB",            desc: "612 colonoscopy frames with ground truth" },
  ];

  return (
    <section id="model-stats" style={{ padding: "96px 24px", backgroundColor: "#FAF7F0" }} ref={ref}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center",
            padding: "8px 16px", borderRadius: "999px",
            backgroundColor: "#0A0A0A", color: "#FAF7F0",
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            marginBottom: "16px",
          }}>Performance</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#0A0A0A", lineHeight: 1.1 }}>
            Model Statistics
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#666666", marginTop: "16px", maxWidth: "480px", margin: "16px auto 0" }}>
            Trained on CVC-ClinicDB with binary cross-entropy + Dice loss.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} style={{
              padding: "32px", borderRadius: "16px",
              backgroundColor: "#F5EFE0", border: "1px solid rgba(10,10,10,0.1)",
            }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0A0A0A", marginBottom: "4px" }}>{s.value}</div>
              <div style={{ fontWeight: 600, color: "#1A1A1A", marginBottom: "8px" }}>{s.label}</div>
              <div style={{ fontSize: "0.875rem", color: "#666666" }}>{s.desc}</div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}