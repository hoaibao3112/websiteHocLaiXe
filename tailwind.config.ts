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
        brand: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        neutral: {
          950: "#0a0a0a",
        },
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-down": "slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
        "page-enter": "pageEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "shimmer": "shimmer 2.2s linear infinite",
        "pulse-ring": "pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "slide-x": "slideX 30s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "hero-text": "heroText 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(28px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-14px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pageEnter: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.85)", opacity: "0.7" },
          "70%": { transform: "scale(1.15)", opacity: "0" },
          "100%": { transform: "scale(0.85)", opacity: "0" },
        },
        glow: {
          "from": { boxShadow: "0 0 10px rgba(245, 158, 11, 0.3), 0 0 20px rgba(245, 158, 11, 0.1)" },
          "to": { boxShadow: "0 0 25px rgba(245, 158, 11, 0.6), 0 0 50px rgba(245, 158, 11, 0.2)" },
        },
        slideX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scaleIn: {
          "from": { transform: "scale(0.8)", opacity: "0" },
          "to": { transform: "scale(1)", opacity: "1" },
        },
        heroText: {
          "from": { transform: "translateY(40px) skewY(3deg)", opacity: "0" },
          "to": { transform: "translateY(0) skewY(0deg)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      scale: {
        "102": "1.02",
        "103": "1.03",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
