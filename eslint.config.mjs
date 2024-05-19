export default [
  {
    languageOptiins: {
      ecmaVersion: 2022,
    },
    rules: {
      'no-console': 0,
      'no-undef': 0,
      'arrow-parens': ['error', 'always'],
      'no-shadow': 0,
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'none',
          ignoreRestSiblings: false,
          reportUsedIgnorePattern: true,
          argsIgnorePattern: '^_',
        },
      ],
    },
    ignores: ['node_modules', 'dist', 'bin', 'build'],
  },
];
