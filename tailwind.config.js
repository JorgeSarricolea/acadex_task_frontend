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
        "custom-bg":"#C8D3C4F2",
        "custom-btn":"#40523A",
        "custom-bg2":"#CEF6BFF2",
        "custom-btn2":"#174E07",
        "custom-color":"#177C0D",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily:{
        montserrat: ["Montserrat", "sans-serif"],
      }
    },
  },
  plugins: [],
};
