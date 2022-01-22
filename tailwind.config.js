module.exports = {
  mode: "jit",
  content: ["./content-scripts/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        "top": "2147483646",
      },
    },
  },
  variants: {},
  plugins: [],
};
