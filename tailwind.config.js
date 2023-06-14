module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        dm: ['"Dm Mono"', "serif"],
        sauce: ["Open Sauce Sans", "sans-serif"],
      },
      zIndex: {
        "-10": "-10",
      },
      colors: {
        teal: {
          DEFAULT: "#00F0FF",
        },
        neon: {
          DEFAULT: "#61FF00",
        },
        light: "#f4f4f4",
        dark: "#192231",
        gold: "#c0b283",
        accent: "#d8e2dc",
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover", "focus"],
      borderWidth: ["focus"],
      backgroundColor: ["hover", "disabled"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
