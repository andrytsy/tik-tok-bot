module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  rules: {
    'brace-style': ['error', '1tbs', {
      allowSingleLine: false,
    }],
    'semi': [2, 'always'],
    camelcase: 'warn',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    curly: ['error', 'all'],
    'default-case': 'off',
    indent: ['error', 4, {
      SwitchCase: 1,
    }],
    'max-len': 'off',
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
    'no-console': 'error',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
      'Literal[value="null"]',
      'BinaryExpression[operator="in"]',
    ],
    'no-script-url': 'warn',
    'no-shadow': 'off',
    'no-shadow-restricted-names': 'warn',
    'no-useless-concat': 'off',
    'no-unused-vars': 'off',

    'object-curly-spacing': ['error', 'never'],
    'object-shorthand': ['error', 'always', {
      avoidQuotes: false,
    }],
    'prefer-template': 'off',

    'node/no-callback-literal': 'off',

    'import/dynamic-import-chunkname': ['error', {
      importFunctions: ['dynamicImport'],
      webpackChunknameFormat: '[0-9a-zA-Z-_/.]+',
    }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      json: 'never',
      jsx: 'never',
      mjs: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'import/no-dynamic-require': 'off',
    'import/prefer-default-export': 'off',
  },
  overrides: [],
};
