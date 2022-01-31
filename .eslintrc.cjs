module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    "solid",
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    "plugin:solid/typescript",
  ],
  env: {
    browser: true,
    node: true,
  },
}
