/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // Example primary color
        secondary: "#64748b", // Example secondary color
        accent: "#f97316", // Example accent color
        background: "#f8fafc", // Example background color
      },
    },
  },
  plugins: [],
};
