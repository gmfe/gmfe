module.exports = {
  extends: ['plugin:gm-react-app/recommended'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'no-unused-expressions': 0,
        'import/named': 0,
      },
    },
  ],
}
