import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').FlatConfig[]} */
export default [
  {
    files: ['apps/web/**/*.{ts,tsx}', 'libs/**/*.{ts,tsx}'],
    ignores: ['coverage', '**/public', '**/dist', '**/dev-dist', 'pnpm-lock.yaml', 'pnpm-workspace.yaml'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['apps/*/tsconfig.json', 'libs/*/tsconfig.json'], // Adjust path to the tsconfig.json
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs?.flat?.recommended,
  prettierConfig,
];

// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
// export default [
//   {
//     files: ["apps/**/*.{ts,tsx}", "libs/**/*.{ts,tsx}"],
//     ignores: ['coverage', '**/public', '**/dist', 'pnpm-lock.yaml', 'pnpm-workspace.yaml']
//   },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs?.flat?.recommended,
//   eslintPluginPrettierRecommended,
// ];
