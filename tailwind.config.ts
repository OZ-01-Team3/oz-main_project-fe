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
        mainBlack: "#131213",
        mainWhite: "#FDFCF7",
        footerOrange: "#FF5634",
        subGray: "#6F6F6F",
        modalBg: "rgba(0, 0, 0, 0.57)",
        hrGray: "#DFDFDF",
      },
      fontFamily: {
        didot: ["var(--font-didot)"],
        pretendard: ["var(--font-pretendard)"],
      },
      width: {
        modalWidth: "475px",
      },
      fontSize: {
        footerText: "9px",
      },
      screens: {
        sm: { min: "390px", max: "819px" },
        md: { min: "820px", max: "1023px" },
        lg: { min: "1080px" },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
export default config;
