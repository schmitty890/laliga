// module.exports = {
//   "extends": "airbnb-base",
//   "env": {
//     "node": true,
//     "mocha": true,
//     "es6": true
//   },
//   "plugins": ["chai-friendly"],
//   "rules": {
//     "comma-dangle": 0,
//     "consistent-return": 0,
//     "function-paren-newline": ["error", "never"],
//     "no-param-reassign": 0,
//     "no-underscore-dangle": 0,
//     "no-shadow": 0,
//     "no-console": 0,
//     "no-plusplus": 0,
//     "no-unused-expressions": 0,
//     "chai-friendly/no-unused-expressions": 2,
//     "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
//   }
// };

module.exports = {
  "parserOptions": {
    "ecmaVersion": "6",
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-empty": "error",
    "no-multiple-empty-lines": "error",
    "no-var": "error",
    "prefer-const": "error",
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "indent": ["error", 2],
    "max-lines": ["error", 300],
    "no-unused-vars": "error",
    "space-infix-ops": "error",
    "padded-blocks": ["error", "never"],
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "comma-style": ["error", "last"],
    "new-cap": ["error", { "newIsCap": true }],
    "no-new-object": "error",
    "func-style": ["error", "expression"],
    "wrap-iife": ["error", "inside"],
    "keyword-spacing": ["error", { "overrides": { "if": { "after": false }, "for": { "after": false }, "while": { "after": false } } }],
    "space-before-blocks": "error",
    "space-before-function-paren": ["error", {"anonymous": "never", "named": "never", "asyncArrow": "always"}],
    "eqeqeq": ["error", "always"]
  }
};
