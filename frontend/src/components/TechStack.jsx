"use client";

export default function TechStack() {
  const stack = [
    { name: "Next.js 14",       role: "Frontend Framework",  bg: "#0A0A0A",                   color: "#FAF7F0" },
    { name: "Tailwind CSS",     role: "Styling",             bg: "#EDE4CC",                   color: "#0A0A0A" },
    { name: "Three.js",         role: "3D Hero Animation",   bg: "rgba(245,166,35,0.2)",      color: "#0A0A0A" },
    { name: "React Dropzone",   role: "File Upload UX",      bg: "#EDE4CC",                   color: "#0A0A0A" },
    { name: "Flask",            role: "Backend API",         bg: "#0A0A0A",                   color: "#FAF7F0" },
    { name: "TensorFlow/Keras", role: "Model Inference",     bg: "rgba(245,166,35,0.2)",      color: "#0A0A0A" },
    { name: "Attention U-Net",  role: "Segmentation Model",  bg: "#0A0A0A",                   color: "#FAF7F0" },
    { name: "Pillow / NumPy",   role: "Image Processing",    bg: "#EDE4CC",                   color: "#0A0A0A" },
    { name: "Vercel",           role: "Frontend Hosting",    bg: "#EDE4CC",                   color: "#0A0A0A" },
    { name: "Render.com",       role: "Backend Hosting",     bg: "rgba(245,166,35,0.2)",      color: "#0A0A0A" },
  ];

  return (
    <section id="tech-stack" style={{ padding: "96px 24px", backgroundColor: "#F5EFE0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center",
            padding: "8px 16px", borderRadius: "999px",
            backgroundColor: "#0A0A0A", color: "#FAF7F0",
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            marginBottom: "16px",
          }}>Built With</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#0A0A0A", lineHeight: 1.1 }}>
            Tech Stack
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#666666", marginTop: "16px", maxWidth: "480px", margin: "16px auto 0" }}>
            Full-stack ML deployment — from trained model to live web app, entirely free.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
          {stack.map((tech) => (
            <div key={tech.name} style={{
              padding: "16px 24px", borderRadius: "16px",
              backgroundColor: tech.bg, color: tech.color,
            }}>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{tech.name}</div>
              <div style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "2px" }}>{tech.role}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}