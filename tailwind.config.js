/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B1B33",
          50: "#EEF1F6",
          100: "#D6DCE8",
          200: "#AEBBD1",
          300: "#8496B4",
          400: "#5C7096",
          500: "#3D5375",
          600: "#28395A",
          700: "#1B2A45",
          800: "#111D34",
          900: "#0B1B33",
          950: "#070F1F",
          975: "#050A16",
        },
        paper: {
          DEFAULT: "#F7F6FB",
          dim: "#EFEDF6",
        },
        mist: {
          DEFAULT: "#E7E9EE",
          dark: "#D6DAE2",
        },
        signal: {
          DEFAULT: "#0EAFA0",
          50: "#E6F8F5",
          100: "#CCF1EB",
          400: "#2CC4B6",
          500: "#0EAFA0",
          600: "#0B8C80",
          700: "#086A61",
        },
        azure: {
          DEFAULT: "#2E6BE6",
          50: "#EAF1FE",
          100: "#D2E1FC",
          400: "#4C82EC",
          500: "#2E6BE6",
          600: "#2050BE",
        },
        iris: {
          DEFAULT: "#6D5CE0",
          50: "#F2EFFC",
          100: "#E2DCF9",
          200: "#C7BCF2",
          300: "#AB9AEA",
          400: "#8B78E4",
          500: "#6D5CE0",
          600: "#5642C7",
          700: "#4432A0",
          800: "#332677",
        },
        amber: {
          DEFAULT: "#C58A2E",
          50: "#FBF3E6",
          100: "#F4E1C0",
          500: "#C58A2E",
          600: "#9E6E22",
        },
        rose: {
          DEFAULT: "#C24A4A",
          50: "#FAEBEB",
          100: "#F1CFCF",
          500: "#C24A4A",
          600: "#9C3838",
        },
      },
      fontFamily: {
        display: ["Manrope", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.02em" }],
      },
      backgroundImage: {
        aurora:
          "radial-gradient(60% 60% at 15% 10%, rgba(109,92,224,0.16) 0%, rgba(109,92,224,0) 60%), radial-gradient(50% 55% at 85% 0%, rgba(14,175,160,0.14) 0%, rgba(14,175,160,0) 60%)",
        "aurora-dark":
          "radial-gradient(60% 60% at 15% 10%, rgba(139,120,228,0.22) 0%, rgba(139,120,228,0) 60%), radial-gradient(50% 55% at 85% 0%, rgba(44,196,182,0.16) 0%, rgba(44,196,182,0) 60%)",
        "iris-signal": "linear-gradient(135deg, #6D5CE0 0%, #2E6BE6 55%, #0EAFA0 100%)",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(11, 27, 51, 0.04), 0 1px 8px -2px rgba(11, 27, 51, 0.06)",
        "card-hover": "0 4px 16px -4px rgba(11, 27, 51, 0.12), 0 2px 6px -2px rgba(11, 27, 51, 0.06)",
        popover: "0 12px 32px -8px rgba(11, 27, 51, 0.18)",
        glow: "0 0 0 1px rgba(109,92,224,0.12), 0 8px 32px -4px rgba(109,92,224,0.28)",
        "glow-dark": "0 0 0 1px rgba(139,120,228,0.18), 0 8px 40px -4px rgba(139,120,228,0.35)",
        "card-dark": "0 1px 2px 0 rgba(0,0,0,0.2), 0 1px 12px -2px rgba(0,0,0,0.3)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0.97)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "rise-in": {
          "0%": { opacity: 0, transform: "translateY(14px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "float-in": {
          "0%": { opacity: 0, transform: "translateY(20px) scale(0.96)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.55 },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out both",
        "scale-in": "scale-in 0.2s ease-out both",
        "rise-in": "rise-in 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "float-in": "float-in 0.4s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.2s ease-in-out infinite",
        "spin-slow": "spin-slow 6s linear infinite",
      },
    },
  },
  plugins: [],
};
