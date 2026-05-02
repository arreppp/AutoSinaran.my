import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          50: '#1a2d4a',
          100: '#152440',
          600: '#0d1f36',
          900: '#060e1a',
        },
        amber: {
          DEFAULT: '#F5A623',
          50: '#fdf3e0',
          100: '#fbe7c0',
          400: '#f7b94a',
          500: '#F5A623',
          600: '#e09410',
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
