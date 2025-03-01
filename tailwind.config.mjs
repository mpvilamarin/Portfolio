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
        robotoMono: ['var(--font-roboto-mono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        'green': "#C1F774",
        'bgGreen': "#909E7B",
        'purple': "#EA91FF",
        'bgPurple': "#705876",
        'blackLight': "#1A1A1A",
        'whiteCream': "#FCFCFC",
      },
    },
  },
  plugins: [],
};