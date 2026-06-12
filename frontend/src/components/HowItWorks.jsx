export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Upload Image",      desc: "Drag and drop a colonoscopy image (JPG, PNG, or TIF). The image is sent securely to the backend API." },
    { num: "02", title: "Preprocessing",     desc: "The backend resizes the image to 256×256 pixels and normalises pixel values to [0, 1] for the model." },
    { num: "03", title: "Attention U-Net",   desc: "The model runs a forward pass. Attention gates highlight relevant polyp regions, and the decoder outputs a probability map." },
    { num: "04", title: "Segmentation Mask", desc: "Pixels above 0.5 probability are classified as polyp. The binary mask is converted to an image and returned." },
    { num: "05", title: "Overlay & Metrics", desc: "The polyp region is highlighted in amber on the original image. Coverage percentage and pixel count are calculated." },
    { num: "06", title: "Results Displayed", desc: "Original, mask, and overlay are shown side by side. Coverage % helps gauge polyp size relative to the frame." },
  ];

  return (
    <section id="how-it-works" style={{ padding: "96px 24px", backgroundColor: "#F5EFE0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center",
            padding: "8px 16px", borderRadius: "999px",
            backgroundColor: "#0A0A0A", color: "#FAF7F0",
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            marginBottom: "16px",
          }}>Pipeline</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#0A0A0A", lineHeight: 1.1 }}>
            How It Works
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#666666", marginTop: "16px", maxWidth: "480px", margin: "16px auto 0" }}>
            From raw colonoscopy image to segmentation mask in under 3 seconds.
          </p>
        </div>

        <div className="hiw-grid">
          {steps.map((step) => (
            <div key={step.num} style={{
              padding: "32px", borderRadius: "16px",
              backgroundColor: "#FAF7F0", border: "1px solid rgba(10,10,10,0.1)",
            }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "rgba(10,10,10,0.1)", marginBottom: "16px" }}>{step.num}</div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0A0A0A", marginBottom: "12px" }}>{step.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "#666666", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .hiw-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .hiw-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}