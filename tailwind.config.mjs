/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'army-green': '#00897C', //#414D34
      },
      fontFamily: {
        notoserif: ['var(--font-noto-serif)'],
        notosans: ['var(--font-noto-sans)'],
      },
    },
  },
  plugins: [require('daisyui')],
};
