import type { Config } from "tailwindcss";

const config: Config = {
  // CRITICAL: This tells Tailwind to scan these files for styles
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // You can add your "Grotesk" font overrides here later
    },
  },
  plugins: [],
};
export default config;