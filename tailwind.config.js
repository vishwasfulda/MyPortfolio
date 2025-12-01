/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL: The 'content' array tells Tailwind which files to scan 
  // for class names so it can generate the corresponding CSS.
  content: [
    "./index.html",
    // Scans all JavaScript/JSX/TypeScript files directly in the root directory (./)
    "./*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}