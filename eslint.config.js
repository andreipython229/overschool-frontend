import js from '@eslint/js'
import parser from '@typescript-eslint/parser'
import pluginTs from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // 🔹 Базовые JS правила
  js.configs.recommended,

  // 🔹 Основной блок для всех файлов
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        FormData: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLElement: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
        Blob: 'readonly',
        File: 'readonly',
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        SVGElement: 'readonly',
        SVGSVGElement: 'readonly',
        SVGPathElement: 'readonly',
        URLSearchParams: 'readonly',
        React: 'readonly',
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      // 🔹 TypeScript
      ...pluginTs.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'warn',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      '@typescript-eslint/no-duplicate-enum-values': 'error',

      // 🔹 JS
      'no-alert': 'error',
      'no-debugger': 'warn',
      'no-plusplus': 'error',
      'no-unused-vars': 'off',
      'no-magic-numbers': 'off',
      'default-param-last': 'off',
      'no-use-before-define': 'off',
      'no-param-reassign': 'off',
      semi: 'off',
      'semi-style': 'off',
      'no-extra-semi': 'off',
      'no-duplicate-imports': 'error',

      // 🔹 React
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // 🔹 Prettier
      'prettier/prettier': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // 🔹 Игнорируемые пути
  {
    ignores: ['**/*.scss', 'dist', 'build', 'node_modules'],
  },
]
