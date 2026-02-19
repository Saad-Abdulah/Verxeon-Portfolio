import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightest': '#F8FAFC',
        'light': '#D9EAFD',
        'medium': '#BCCCDC',
        'dark': '#9AA6B2',
        'text-dark': '#1f2937',
        'text-gray': '#6b7280',
        'text-light': '#9ca3af',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        // New standardized font families
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        titillium: ['var(--font-titillium)'],
        },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.3' },
          '50%': { transform: 'translateY(-15px) rotate(180deg)', opacity: '0.6' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config; 