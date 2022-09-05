/** @type {import('tailwindcss').Config} */
module.exports = {
  //content: ['./src/routes/events/index.svelte'],
  //ignore: ['./src/routes/events/__layout.svelte'],
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#52b2d6",
          "primary-content": "#ffffff",
          neutral: "#072c3f",
          "neutral-content": "#dfeef6",
          "base-100": "#0b3b54",
          "base-content": "#dfeef6",
        },
      },
    ],
  },
}
