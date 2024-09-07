import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      blue: "#137aa8",
      sky: "#aad4e6",
      amber: "#f3952f",
      neutral: "#faf5e8",
      orange: "#ed5f1e",
      "orange-light": "#ff8210",
      white: "#ffffff",
      slate: "#0f172a",
      "slate-light": "#054875",
    },
    extend: {
      fontSize: {
        "2xl": "1.75rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
