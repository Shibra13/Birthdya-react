/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: '#070B14',
          panel: '#0E1630',
          soft: '#151F3F',
        },
        starlight: {
          DEFAULT: '#8EC9F0',
          bright: '#BFE0FF',
          deep: '#5FC9E8',
        },
        rosegold: {
          DEFAULT: '#E3A9A0',
          soft: '#EFC6BE',
          deep: '#C97F74',
        },
        parchment: '#F3ECDD',
        ink: {
          DEFAULT: '#EAF0FB',
          muted: '#93A2C4',
          faint: '#5C6A8C',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(142, 201, 240, 0.45)',
        'glow-rose': '0 0 40px -8px rgba(227, 169, 160, 0.45)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
      },
    },
  },
  plugins: [],
};
