import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-roboto-mono)', ...defaultTheme.fontFamily.mono],
        robotoMono: ['var(--font-roboto-mono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        base:           '#0D0709',
        surface:        '#150B0D',
        elevated:       '#1F1015',
        accent:         '#F43F5E',
        'accent-light': '#FB7185',
        primary:        '#FFF1F2',
        muted:          '#9D8B8E',
        line:           '#2D1519',
        // Legacy — para referencias que aún no migraron
        green:          '#C1F774',
        purple:         '#EA91FF',
        blackLight:     '#1A1A1A',
        whiteCream:     '#FCFCFC',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
