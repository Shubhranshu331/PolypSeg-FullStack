"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Individual floating cube ─────────────────────────────────────────────── */
function FloatingCube({ position, scale, speed, rotSpeed, color, wireframe }) {
  const meshRef = useRef();
  const clock   = useRef(Math.random() * 100);

  useFrame((_, delta) => {
    clock.current += delta * speed;
    meshRef.current.position.y =
      position[1] + Math.sin(clock.current) * 0.6;
    meshRef.current.rotation.x += delta * rotSpeed * 0.4;
    meshRef.current.rotation.y += delta * rotSpeed * 0.6;
    meshRef.current.rotation.z += delta * rotSpeed * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      {wireframe ? (
        <meshBasicMaterial color={color} wireframe opacity={0.35} transparent />
      ) : (
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.1}
          opacity={0.18}
          transparent
        />
      )}
    </mesh>
  );
}

/* ── Scene ─────────────────────────────────────────────────────────────────── */
function CubeScene() {
  const cubes = [
    { position: [-5,  1, -4], scale: 1.4, speed: 0.4, rotSpeed: 0.5, color: "#0A0A0A", wireframe: true  },
    { position: [ 5,  0, -5], scale: 1.8, speed: 0.3, rotSpeed: 0.4, color: "#0A0A0A", wireframe: true  },
    { position: [-3, -2, -3], scale: 0.9, speed: 0.6, rotSpeed: 0.7, color: "#C8B882", wireframe: false },
    { position: [ 3,  2, -2], scale: 1.1, speed: 0.5, rotSpeed: 0.6, color: "#C8B882", wireframe: false },
    { position: [ 0, -3, -6], scale: 2.2, speed: 0.2, rotSpeed: 0.3, color: "#0A0A0A", wireframe: true  },
    { position: [-6,  3, -7], scale: 1.6, speed: 0.35,rotSpeed: 0.45,color: "#C8B882", wireframe: true  },
    { position: [ 6, -1, -4], scale: 1.0, speed: 0.55,rotSpeed: 0.55,color: "#0A0A0A", wireframe: false },
    { position: [-1,  4, -5], scale: 0.7, speed: 0.7, rotSpeed: 0.8, color: "#F5A623", wireframe: false },
  ];

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      {cubes.map((c, i) => (
        <FloatingCube key={i} {...c} />
      ))}
    </>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay bg-cream-100"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <CubeScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center" style={{ paddingTop: "60px" }}>

        {/* Tag */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <span className="tag">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-highlight inline-block" />
            Attention U-Net · Medical Imaging AI
          </span>
        </div>

        {/* Headline */}
        <h1 className="heading-xl text-ink-900 mb-6 animate-fade-up">
          AI That Sees
          <br />
          <span className="relative inline-block">
            What Eyes
            {/* Underline stroke */}
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 400 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8 C80 2, 200 2, 398 8"
                stroke="#F5A623"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <br />
          Miss.
        </h1>

        {/* Subtitle */}
        <p className="body-lg max-w-2xl mx-auto mb-10 animate-fade-up delay-200" style={{ color: "#1A1A1A" }}>
          Deep learning segmentation model trained to detect and delineate polyps
          in colonoscopy images — potentially saving lives through earlier detection.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up delay-300">
          <a href="#demo" className="btn-primary px-8 py-4 text-base">
            Try Live Demo →
          </a>
          <a
            href="https://github.com/Shubhranshu331/PolypSeg-FullStack"
            target="_blank"
            rel="noreferrer"
            className="btn-outline px-8 py-4 text-base"
          >
            View on GitHub
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 animate-fade-up delay-400">
          {[
            { label: "Dice Score",   value: "76.81%" },
            { label: "IoU Score",    value: "69.01%" },
            { label: "Architecture", value: "Attention U-Net" },
            { label: "Input Size",   value: "256 × 256" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-ink-900">{s.value}</div>
              <div className="text-xs font-medium text-ink-300 tracking-widest uppercase mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-600">
        <span className="text-xs text-ink-300 tracking-widest uppercase">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-ink-300 to-transparent" />
      </div>
    </section>
  );
}
