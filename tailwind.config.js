const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
      fontFamily: {
        display: ["Inter", "system-ui"],
      },
      rotate: {
        "-25": "-25deg",
        25: "25deg",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
