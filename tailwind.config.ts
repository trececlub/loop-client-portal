import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F4F7F6",
        ink: "#102126",
        panel: "#FFFFFF",
        mint: "#0B8B7D",
        coral: "#D95D39",
        slate: "#36505E",
        sky: "#3A8DDE"
      },
      boxShadow: {
        card: "0 18px 30px -24px rgba(16, 33, 38, 0.35)"
      }
    }
  },
  plugins: [],
};

export default config;
