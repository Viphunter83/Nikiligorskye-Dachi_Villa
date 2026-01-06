import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a", // Deepest black
        surface: "#121212",    // Charcoal
        primary: "#D4AF37",    // Amber Gold (High-end accent)
        secondary: "#2A2A2A",  // Border/Stroke
        text: {
          main: "#E5E5E5",
          muted: "#A3A3A3",
        },
        glass: "rgba(255, 255, 255, 0.03)", // Glassmorphism effect
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'], // For headlines
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, #0a0a0a 100%)',
        'noise': "url('/noise.png')", // We will add noise later
      }
    },
  },
  plugins: [],
};
export default config;
