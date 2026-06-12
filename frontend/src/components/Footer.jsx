"use client";

export default function Footer() {
  const links = [
    { label: "Live Demo",  href: "#demo",                                                                    external: false },
    { label: "GitHub",     href: "https://github.com/Shubhranshu331/PolypSeg-FullStack",                    external: true  },
    { label: "Dataset",    href: "https://www.kaggle.com/datasets/shubhranshu331/colonoscopy-images",       external: true  },
    { label: "Portfolio",  href: "https://portfolio-pied-seven-64.vercel.app/",                             external: true  },
  ];

  return (
    <footer style={{ backgroundColor: "#0A0A0A", color: "#FAF7F0", padding: "48px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="footer-inner">

          <div>
            <div style={{ fontWeight: 900, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
              PolypSeg <span style={{ color: "#F5A623" }}>AI</span>
            </div>
            <div style={{ fontSize: "0.8rem", color: "rgba(250,247,240,0.4)", marginTop: "4px" }}>
              Attention U-Net · CVC-ClinicDB · TensorFlow
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "24px" }}>
            {links.map((link) => (
              <a key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                style={{ fontSize: "0.875rem", color: "rgba(250,247,240,0.5)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = "#FAF7F0")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(250,247,240,0.5)")}
              >{link.label}</a>
            ))}
          </div>

          <div style={{ fontSize: "0.75rem", color: "rgba(250,247,240,0.25)" }}>
            Built by Shubhranshu · {new Date().getFullYear()}
          </div>

        </div>
      </div>

      <style>{`
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }
        @media (max-width: 640px) {
          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
        }
      `}</style>
    </footer>
  );
}