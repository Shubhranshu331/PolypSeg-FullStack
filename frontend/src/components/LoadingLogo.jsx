"use client";

export default function LoadingLogo({ size = 80 }) {
  return (
    <div
      style={{
        minHeight: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "16px",
          backgroundColor: "#F5EFE0",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          src="/LoadingLogo.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: size, height: size, objectFit: "contain" }}
        />
      </div>

      <p style={{
        color: "#666666",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}>
        Analysing…
      </p>
    </div>
  );
}