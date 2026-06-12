import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PolypSeg — AI Polyp Segmentation",
  description: "Deep learning segmentation model that detects and delineates polyps in colonoscopy images using Attention U-Net.",
  icons: {
    icon: "/favicon.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
