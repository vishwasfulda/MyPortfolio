/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL: The 'content' array tells Tailwind which files to scan 
  // for class names so it can generate the corresponding CSS.
  content: [
    // 1. Scans the root HTML file
    "./index.html",
    // 2. Scans ALL JavaScript, TypeScript, and JSX/TSX files
    //    in the root directory AND all subdirectories (using **/)
    "./**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      // You can define custom colors, fonts, spacing, etc., here
    },
  },
  plugins: [],
}