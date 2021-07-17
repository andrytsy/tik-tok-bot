/* eslint no-use-before-define: 0 */
module.exports = {
  root: true,
  env: {
    es6: true
  },
  extends: [  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    indent: ['error', 4, { SwitchCase: 1 }],
    'no-mixed-spaces-and-tabs': 0,
    'no-tabs': 0,
    "comma-dangle": ["error", {
      "arrays": "always",
      "objects": "always",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }]
  },
  overrides: [
    {
      files: ['.js'],
      rules: {
        indent: 'off'
      }
    }
  ]
}