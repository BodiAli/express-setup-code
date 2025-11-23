import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import vitest from "@vitest/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.vitest,
      },
      ecmaVersion: "latest",
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
    },
  },
  eslintConfigPrettier,
  {
    files: ["**/*.test.{ts,tsx}"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.all.rules,
      "@typescript-eslint/unbound-method": "off",
      "vitest/require-hook": ["error", { allowedFunctionCalls: ["app.use"] }],
      "vitest/no-conditional-in-test": "off",
      "vitest/no-hooks": "off",
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
]);
