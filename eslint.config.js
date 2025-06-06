import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import { register } from "ts-node";

register();

export default tseslint.config(
  { ignores: ["dist"] },
  {
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: tseslint.parser,
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettier,
      import: importPlugin,
      prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "import/order": [
        "warn",
        {
          groups:
            [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index"
            ],
          "newlines-between": "always",
        },
      ],
      "import/no-unresolved": "error",
      "prettier/prettier": "warn",
      "array-element-newline": [
        "warn",
        {
          ArrayExpression: "consistent",
          ObjectExpression: "consistent",
          ImportDeclaration: { minItems: 3 },
        },
      ],
    },
  },
  {
    ...prettierConfig,
  }
);
