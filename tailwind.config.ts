import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          50: '#e8eef6',
          100: '#c5d5ea',
          200: '#9fb9dc',
          300: '#7a9dce',
          400: '#5e87c3',
          500: '#4371b8',
          600: '#3860a1',
          700: '#2d4f87',
          800: '#1e3a6a',
          900: '#123B70',
          950: '#0a2244',
        },
        gold: {
          50: '#fdf8eb',
          100: '#f9ecc8',
          200: '#f3d78f',
          300: '#edc256',
          400: '#DDA63A',
          500: '#c99226',
          600: '#a5751d',
          700: '#7f5a17',
          800: '#5c4113',
          900: '#3d2c0f',
        },
        'sky-blue': {
          DEFAULT: '#5DA9E9',
          light: '#8ec4f0',
          dark: '#3a8fd4',
        },
        'cta-red': {
          DEFAULT: '#D92727',
          dark: '#b71e1e',
          light: '#e54a4a',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
