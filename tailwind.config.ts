import Core from "@sk-web-gui/core";
import { Config } from "tailwindcss/types/config";
import ContainerQueries from "@tailwindcss/container-queries";

export default {
  mode: "jit",
  content: [
    "./**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sk-web-gui/*/dist/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        content: "1000px",
        fill: "-webkit-fill-available",
      },
      width: {
        fill: "-webkit-fill-available",
      },
    },
  },
  plugins: [
    Core({
      cssBase: true,
      colors: [],
    }),
    ContainerQueries,
  ],
} satisfies Config;
