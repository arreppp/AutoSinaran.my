import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1515',
          50: '#1a2e2e',
          100: '#152525',
          600: '#0D1E1E',
          900: '#060f0f',
        },
        amber: {
          DEFAULT: '#00A19C',
          50: '#e6f7f7',
          100: '#cceeee',
          400: '#00B5AF',
          500: '#00A19C',
          600: '#008080',
        },
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
} satisfies Config
