
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      js
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser
    }
  },

  // TypeScript et Angular
  {
    files: ["**/*.ts"],
    extends: [
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates
  },

  // Templates HTML Angular
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended
    ]
  }
]);
