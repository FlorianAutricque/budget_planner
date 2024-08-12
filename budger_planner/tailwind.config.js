/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".hide-scrollbar": {
            overflowY: "hidden",
            "scrollbar-width": "none", // Firefox
            "-ms-overflow-style": "none", // IE and Edge
          },
          ".hide-scrollbar::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
