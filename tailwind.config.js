// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar'

module.exports = {
  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      fontFamily: {
        // 'script' becomes your new utility class: font-script
       
        // 'sans' can be extended too if needed globally
      },
    },
  },
  plugins: [
    tailwindScrollbar,
  ]
}
