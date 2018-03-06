module.exports = {
  env: {
    commonjs: true,
    node: true,
    es6: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      // 启用对实验性的 object rest/spread properties 的支持
      experimentalObjectRestSpread: true,
      // "objectLiteralShorthandProperties": true,
    },
    sourceType: 'module'
  },
  // "parser": "babel-eslint",
  // plugins: ['node.js'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  }
};
