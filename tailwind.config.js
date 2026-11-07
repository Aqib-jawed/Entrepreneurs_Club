/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/ui/connected-carousel.tsx"],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        background: "#0B0E14",
        foreground: "#F5F3EE",
        card: "#121722",
        "card-foreground": "#F5F3EE",
        secondary: "#25303C",
        "secondary-foreground": "#F5F3EE",
        muted: "#17212B",
        "muted-foreground": "#A6ABB3",
        ring: "#E8A33D",
      },
    },
  },
  plugins: [],
};
