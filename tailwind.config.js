/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pinkbg: 'hsl(330, 30%, 98%)',
        primary: 'hsl(330, 72%, 56%)',
        primarylight: 'hsl(330, 72%, 92%)',
        primarydark: 'hsl(330, 72%, 44%)',
        lav: 'hsl(290, 50%, 58%)',
        lavlight: 'hsl(290, 50%, 92%)',
        mint: 'hsl(165, 45%, 72%)',
        mintdark: 'hsl(165, 45%, 45%)',
        cardwhite: 'hsl(0, 0%, 100%)',
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 24px -4px hsl(330 72% 56% / 0.12)',
        'card-hover': '0 8px 32px -4px hsl(330 72% 56% / 0.22)',
        glow: '0 0 16px hsl(330 72% 56% / 0.35)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse_glow: {
          '0%, 100%': { boxShadow: '0 0 8px hsl(330 72% 56% / 0.3)' },
          '50%': { boxShadow: '0 0 24px hsl(330 72% 56% / 0.7)' },
        },
        barBounce: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.04)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease both',
        'fadeUp-delay': 'fadeUp 0.5s ease 0.15s both',
        'fadeUp-delay2': 'fadeUp 0.5s ease 0.3s both',
        'fadeUp-delay3': 'fadeUp 0.5s ease 0.45s both',
        pulse_glow: 'pulse_glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
