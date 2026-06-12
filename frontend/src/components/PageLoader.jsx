"use client";
import { useState, useEffect } from "react";

export default function PageLoader({ children }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // After 3 seconds start fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // After fade out animation (0.8s), hide loader completely
    const hideTimer = setTimeout(() => {
      setLoading(false);
    }, 3800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {/* Full screen loader */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#F5EFE0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "24px",
            transition: "opacity 0.8s ease",
            opacity: fadeOut ? 0 : 1,
            pointerEvents: fadeOut ? "none" : "all",
          }}
        >
          <video
            src="/LoadingLogo.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "180px",
              height: "180px",
              objectFit: "contain",
              borderRadius: "24px",
            }}
          />
          <p style={{
            color: "#888888",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>
            Loading…
          </p>
        </div>
      )}

      {/* Actual page — fades in when loader disappears */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}