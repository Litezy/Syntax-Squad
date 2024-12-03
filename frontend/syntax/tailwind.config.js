/** @type {import('tailwindcss').Config} */
export default {
  content: [

    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        Grotesk:[ "Space Grotesk", 'sans-serif']
      },
      
      colors: {
        primary: 'var(--primary-color)',
        background: 'var(--secondary-color)'  // Use the CSS variable
      },

      
    },
  },
  plugins: [


  ],
}

