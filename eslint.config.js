export default [
  {
    ignores: ['node_modules', 'dist', 'build', '.pnpm', '.turbo', 'coverage'],

    files: ['apps/**/*.js', 'packages/**/*.js'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
      },
    },

    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',

      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-constant-condition': 'warn',
    },
  },
];