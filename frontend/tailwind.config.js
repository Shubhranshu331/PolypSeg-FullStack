/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cream-50":  "#FAF7F0",
        "cream-100": "#F5EFE0",
        "cream-200": "#EDE4CC",
        "ink-900":   "#0A0A0A",
        "ink-700":   "#1A1A1A",
        "ink-400":   "#666666",
        "ink-300":   "#888888",
        "ink-200":   "#AAAAAA",
        "amber-highlight": "#F5A623",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
