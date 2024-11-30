/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}", "main.js"],
  theme: {
    extend: {
      height:{
        '128': "32rem",
        '112': "28rem",
      },
      width:{
        '128': "32rem",
        '112': "28rem",
      }, 
      boxShadow:{
        'Dark': "0px 0px 10px black"
      }
    },
  },
  plugins: [],
};
