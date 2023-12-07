import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "profiq-green": "#8ec549",
        "profiq-green-shaddow": "#a3b889",
        "profiq-blue": "#002c62",
        "profiq-blue-light": "#0160d5",
        "profiq-blue-transparent": "#002c62c4",
        "profiq-white": "#ffffff",
        "profiq-grey": "#e6e6e6",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "profiq-logo": "url('/logo.png')",
        "profiq-logo-hover": "url('/logoHover.png')",
        checkbox: "url('/check.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
