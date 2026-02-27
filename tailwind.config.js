/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          50: "#f0f0f2",
          100: "#d8d8e0",
          200: "#b4b4c4",
          300: "#8888a4",
          400: "#606080",
          500: "#3c3c58",
          600: "#2a2a44",
          700: "#1e1e34",
          800: "#141428",
          900: "#0a0a1a",
          950: "#050510",
        },
        neon: {
          cyan: "#00e5ff",
          purple: "#b847ff",
          green: "#39ff7e",
          amber: "#ffb800",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "radial-gradient(circle, rgba(0,229,255,0.08) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
    },
  },
  plugins: [],
};
