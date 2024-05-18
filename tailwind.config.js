/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        userWhite: "#F8FAFC",
        userYellow: "#F5D565",
        userLightOrange: "#F5E8D5",
        userOrange: "#E9A23B",
        userLightGreen: "#A0ECB1",
        userGreen: "#32D657",
        userPink: "#F7D4D3",
        userRed: "#DD524C",
        userLightGrey: "#E3E8EF",
        userDarkGrey: "#97A3B6",
        userBlue: "#3662E3",
      },
    },
  },
  plugins: [],
}