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
        ielts: {
          red: '#e0001a',
          redHover: '#c40017',
          dark: '#0a0a0c',
          borderDark: '#27272a',
          cardDark: '#121215',
          textDark: '#ededed',
          mutedDark: '#a1a1aa',
          canvasLight: '#ffffff',
          borderLight: '#e5e5e7',
          textLight: '#1d1d1f',
          mutedLight: '#86868b',
          cardLight: '#fbfbfd',
          subtleLight: '#f5f5f7',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        mono: [
          'SFMono-Regular',
          'ui-monospace',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
        apple: '-0.03em',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'apple': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'apple-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}

