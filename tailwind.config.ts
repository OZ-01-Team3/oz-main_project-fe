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
        footerOrange:"#FF5634"
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
