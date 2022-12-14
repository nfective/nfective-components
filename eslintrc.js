export default {
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "brace-style": ["error", "stroustrup", { allowSingleLine: true }]
  }
}
