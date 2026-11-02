import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import mochaNoOnly from "eslint-plugin-mocha-no-only";
import storybook from "eslint-plugin-storybook";

export default [
  { ignores: ["dist/**", "dist-ssr/**", "storybook-static/**", "playground/**"] },
  {
    files: ["**/*.{ts,tsx,js,jsx,cjs}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "mocha-no-only": mochaNoOnly,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "none" }],
      "@typescript-eslint/consistent-type-imports": "warn",
      "mocha-no-only/mocha-no-only": "error",
      "one-var": ["error", { initialized: "never" }],
      "no-console": "warn",
    },
  },
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.stories.{ts,tsx,js,jsx}"],
    rules: {
      // Storybook 8 exports story types from the renderer package.
      "storybook/no-renderer-packages": "off",
    },
  },
];
