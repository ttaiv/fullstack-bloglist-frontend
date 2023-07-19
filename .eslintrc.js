module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,
    'max-len': 0,
    'react/prop-types': 0,
  },
};
