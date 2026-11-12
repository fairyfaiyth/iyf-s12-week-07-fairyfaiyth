import js from "@eslint/js";
import globals from "globals";

export default [
    { ignores: ["node_modules/", "daily-challenges/day4-refactor/config.example.js"] },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: { ...globals.browser },
        },
        rules: {
            "no-var": "error",
            eqeqeq: "error",
            curly: "error",
            "prefer-const": "warn",
            "no-unused-vars": "warn",
        },
    },
    {
        files: ["tests/**/*.js", "lesson13/task13-4.js"],
        languageOptions: { globals: { ...globals.node } },
    },
    {
        files: ["daily-challenges/day4-refactor/**/*.js"],
        languageOptions: { sourceType: "script", globals: { API_KEY: "readonly" } },
        rules: { "no-unused-vars": "off" },
    },
];
