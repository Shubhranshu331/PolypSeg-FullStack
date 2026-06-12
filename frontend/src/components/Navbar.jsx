"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["About", "How It Works", "Model Stats", "Demo", "Tech Stack"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "all 0.3s",
        backgroundColor: scrolled ? "rgba(250,247,240,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(10,10,10,0.1)" : "none",
      }}>
        <div style={{
          maxWidth: "1280px", margin: "0 auto",
          padding: "0 24px", height: "64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <span style={{ fontWeight: 900, color: "#0A0A0A", fontSize: "1.1rem", letterSpacing: "-0.02em", flexShrink: 0 }}>
            PolypSeg <span style={{ color: "#F5A623" }}>AI</span>
          </span>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="desktop-nav">
            {links.map((item) => (
              <a key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                style={{ fontSize: "0.875rem", fontWeight: 500, color: "#666666", textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = "#0A0A0A")}
                onMouseLeave={(e) => (e.target.style.color = "#666666")}
              >{item}</a>
            ))}
          </div>

          {/* Desktop GitHub button */}
          <a href="https://github.com/Shubhranshu331/PolypSeg-FullStack"
            target="_blank" rel="noreferrer"
            className="desktop-nav"
            style={{
              display: "inline-flex", alignItems: "center",
              padding: "8px 16px", borderRadius: "10px",
              border: "1px solid rgba(10,10,10,0.2)",
              fontSize: "0.75rem", fontWeight: 600,
              color: "#0A0A0A", textDecoration: "none",
            }}
          >GitHub →</a>

          {/* Hamburger button — mobile only */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              flexDirection: "column", justifyContent: "center", alignItems: "center",
              gap: "5px", width: "40px", height: "40px",
              background: "none", border: "none", cursor: "pointer", padding: "4px",
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              display: "block", width: "22px", height: "2px",
              backgroundColor: "#0A0A0A", borderRadius: "2px",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px",
              backgroundColor: "#0A0A0A", borderRadius: "2px",
              transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px",
              backgroundColor: "#0A0A0A", borderRadius: "2px",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div style={{
        position: "fixed", top: "64px", left: 0, right: 0, zIndex: 49,
        backgroundColor: "rgba(250,247,240,0.98)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(10,10,10,0.1)",
        overflow: "hidden",
        transform: menuOpen ? "translateY(0)" : "translateY(-200%)",
        transition: "transform 0.3s ease",
        padding: menuOpen ? "16px 24px 24px" : "0 24px",
      }} className="mobile-menu">
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {links.map((item) => (
            <a key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "12px 0",
                fontSize: "1rem", fontWeight: 600, color: "#0A0A0A",
                textDecoration: "none",
                borderBottom: "1px solid rgba(10,10,10,0.06)",
              }}
            >{item}</a>
          ))}
          <a href="https://github.com/Shubhranshu331/PolypSeg-FullStack"
            target="_blank" rel="noreferrer"
            style={{
              marginTop: "12px", padding: "12px 0",
              fontSize: "0.9rem", fontWeight: 600, color: "#F5A623",
              textDecoration: "none",
            }}
          >GitHub →</a>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}