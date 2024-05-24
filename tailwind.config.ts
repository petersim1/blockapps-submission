import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      "2xl": { max: "1536px" },
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xs: { max: "450px" },
    },
    extend: {
      gridTemplateColumns: {
        14: "repeat(16, minmax(0, 1fr))",
      },
      rotate: {
        135: "135deg",
      },
      spacing: {
        "content-limit": "var(--padding-screen)",
      },
      colors: {
        dark: "#121212",
      }
    },
  },
  plugins: [],
}
export default config
