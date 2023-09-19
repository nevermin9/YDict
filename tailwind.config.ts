import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // #3e5991
        green: {
          500: "#81B29A"
        },
        gray: {
          400: "#b2c1e0",
        },
        violet: {
          600: '#806491',
        },
        amber: {
          900: '#B9848C'
        },
        blue: {
          900: '#02315E',
          700: '#00457E',
          600: '#2F70AF',
        },
        skyblue: {
          500: "#3e5991",
          700: "#2b3f66"
        },
        deepblue: {
          500: "#3D405B",
        },
        sand: {
          300: "#F4F1DE"
        },
        red: {
          500: "#E07A5F",
        },
      },
      zIndex: {
        "6666": "6666",
        "7777": "7777", // header
        "8888": "8888", // overlay
        "9999": "9999", // modals
      },
    },
  },
  plugins: [],
} satisfies Config

