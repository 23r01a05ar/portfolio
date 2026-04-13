/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neo-bg': '#FFFDF5',
        'neo-accent': '#FF6B6B',
        'neo-secondary': '#FFD93D',
        'neo-muted': '#C4B5FD',
        'neo-dark': '#0A0A0A',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'neo-sm': '4px 4px 0px 0px #000',
        'neo': '6px 6px 0px 0px #000',
        'neo-md': '8px 8px 0px 0px #000',
        'neo-lg': '12px 12px 0px 0px #000',
        'neo-xl': '16px 16px 0px 0px #000',
        'neo-white': '8px 8px 0px 0px #fff',
        'neo-accent': '6px 6px 0px 0px #FF6B6B',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
