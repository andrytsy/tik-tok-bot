/* eslint no-use-before-define: 0 */
module.exports = {
  root: true,
  env: {
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    indent: ['error', 4, { SwitchCase: 1 }],
    'vue/html-indent': ['error', 4 ],
    'vue/script-indent': ['error', 4, {
      baseIndent: 1,
      switchCase: 1
    }],
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
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ]
}