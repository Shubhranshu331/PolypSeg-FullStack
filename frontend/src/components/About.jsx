export default function About() {
  const cards = [
    { stat: "~1.9M",  label: "New colorectal cancer cases per year globally" },
    { stat: "25%",    label: "Polyps missed during standard colonoscopy" },
    { stat: "90%+",   label: "Survival rate if caught at earliest stage" },
    { stat: "76.81%", label: "Dice score achieved by this model" },
  ];

  return (
    <section id="about" style={{ padding: "96px 24px", backgroundColor: "#FAF7F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="about-grid">

          <div>
            <span style={{
              display: "inline-flex", alignItems: "center",
              padding: "8px 16px", borderRadius: "999px",
              backgroundColor: "#0A0A0A", color: "#FAF7F0",
              fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: "24px",
            }}>About This Project</span>

            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#0A0A0A", lineHeight: 1.1, marginBottom: "24px" }}>
              Why Polyp Detection Matters
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "1.05rem", color: "#666666", lineHeight: 1.7 }}>
              <p style={{ margin: 0 }}>
                Colorectal cancer is the third most common cancer worldwide. Most cases begin as small polyps — yet up to{" "}
                <strong style={{ color: "#0A0A0A" }}>25% of polyps are missed</strong> during colonoscopy due to human fatigue, poor visibility, and camera angle.
              </p>
              <p style={{ margin: 0 }}>
                This project applies <strong style={{ color: "#0A0A0A" }}>Attention U-Net</strong>, a deep learning architecture that uses attention gates to focus on relevant polyp regions, trained on the CVC-ClinicDB dataset.
              </p>
              <p style={{ margin: 0 }}>
                The goal: an AI assistant that flags regions for clinicians to review — not replacing doctors, but giving them a reliable second opinion.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {cards.map(({ stat, label }) => (
              <div key={stat} style={{
                padding: "24px", borderRadius: "16px",
                backgroundColor: "#F5EFE0", border: "1px solid rgba(10,10,10,0.1)",
              }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0A0A0A", marginBottom: "8px" }}>{stat}</div>
                <div style={{ fontSize: "0.875rem", color: "#666666", lineHeight: 1.4 }}>{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  );
}