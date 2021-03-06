module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },

  env: {
    browser: true
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',


    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    'plugin:vue/essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    // 'plugin:vue/recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

    'airbnb-base'

  ],

  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    'vue',

  ],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true
  },

  // add your custom rules here
  rules: {
    'no-param-reassign': 'off',

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'prefer-promise-reject-errors': 'off',
    'new-cap': 'off',
    'no-return-assign': 'off',
    'object-shorthand': 'off',

    'max-len': 'off',
    'semi': 'off',
    'space-before-blocks': 'off',
    'keyword-spacing': 'off',
    'no-alert': 'off',
    'comma-spacing': 'off',
    'arrow-spacing': 'off',
    'arrow-parens': 'off',
    'no-console': 'off',
    'indent': 'off',
    'arrow-body-style': 'off',
    'object-curly-spacing': 'off',
    'newline-per-chained-call': 'off',
    'no-tabs': 'off',
    'quotes': 'off',
    'func-names': 'off',
    'prefer-const': 'off',
    'no-unused-vars': 'off',
    'space-before-function-paren': 'off',
    'space-infix-ops': 'off',
    'comma-dangle': 'off',
    'prefer-destructuring': 'off',
    'no-undef': 'off',
    'nonblock-statement-body-position': 'off',
    'curly': 'off',
    'padded-blocks': 'off',
    'no-multi-spaces': 'off',
    'prefer-arrow-callback': 'off',
    'no-unsafe-finally': 'off',
    'no-eval': 'off',
    'one-var': 'off',
    'no-else-return': 'off',
    'eqeqeq': 'off',
    'semi-spacing': 'off',
    'operator-linebreak': 'off',
    'consistent-return': 'off',
    'no-unneeded-ternary': 'off',
    'eqlines-between-class-memberseqeq': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'key-spacing': 'off',
    'no-mixed-operators': 'off',
    'no-useless-escape': 'off',
    'lines-between-class-members': 'off',
    'no-restricted-globals': 'off',
    'no-multiple-empty-lines': 'off',
    'no-nested-ternary': 'off',
    'one-var-declaration-per-line': 'off',
    'operator-assignment': 'off',
    'space-in-parens': 'off',
    'prefer-template': 'off',
    'no-extra-semi': 'off',
    'radix': 'off',
    'no-bitwise': 'off',
    'no-restricted-properties': 'off',
    'import/newline-after-import': 'off',
    'spaced-comment': 'off',
    'eqeqeq': 'off',
    'eqeqeq': 'off',
    'eqeqeq': 'off',
    'eqeqeq': 'off',


    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
