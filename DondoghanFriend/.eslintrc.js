module.exports = {
    root: true,
    extends: [
        "@react-native",
        "prettier",
        "eslint:recommended",
        "plugin:prettier/recommended",
    ],
    plugins: ["prettier"],
    rules: { "prettier/prettier": ["error", { endOfLine: "auto" }] },
};
