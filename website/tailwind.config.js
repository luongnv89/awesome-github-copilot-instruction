/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        copilot: {
          primary: 'var(--copilot-primary)',
          secondary: 'var(--copilot-secondary)',
          accent: 'var(--copilot-accent)',
          text: 'var(--copilot-text)',
          bg: 'var(--copilot-bg)',
          border: 'var(--copilot-border)',
          hover: 'var(--copilot-hover)',
        }
      },
      animation: {
        'modal-entry': 'modal-entry 0.2s ease-out',
        'copilot-glow': 'copilot-glow 2s infinite'
      },
      keyframes: {
        'modal-entry': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          }
        },
        'copilot-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(88, 166, 255, 0.4)'
          },
          '50%': {
            boxShadow: '0 0 20px rgba(88, 166, 255, 0.6)'
          }
        }
      }
    },
  },
  plugins: [],
}