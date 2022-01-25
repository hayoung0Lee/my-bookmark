module.exports = {
  mode: "jit",
  content: ["./*.{html,js,tsx,ts}", "./src/*.{html,js,tsx,ts}"],
  theme: {
    extend: { zIndex: { "top": "2147483646" } },
  },
  variants: {},
  plugins: [],
};
