module.exports = {
  mode: "jit",
  content: ["./src/contents/*.{html,js,ts,tsx}"],
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
