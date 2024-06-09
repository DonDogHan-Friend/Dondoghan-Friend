module.exports = {
    root: true,
    extends: [
        "@react-native",
        "prettier",
        "eslint:recommended",
        "plugin:prettier/recommended",
    ],
    plugins: ["prettier", "simple-import-sort"],
    rules: {
        "prettier/prettier": [
            "error",
            { endOfLine: "auto", arrowParens: "always" },
        ],
        "simple-import-sort/imports": [
            "error",
            {
                groups: [
                    // Packages `react` related packages come first.
                    ["^react", "^@?\\w"],
                    // Internal packages.
                    ["^(@|components)(/.*|$)"],
                    // Side effect imports.
                    ["^\\u0000"],
                    // Parent imports. Put `..` last.
                    ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                    // Other relative imports. Put same-folder imports and `.` last.
                    ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                    // Style imports.
                    ["^.+\\.?(css)$"],
                ],
            },
        ],
        "simple-import-sort/exports": "warn",
    },
};
