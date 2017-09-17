module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: [
    'prettier',
  ],
  rules: {
    'new-cap':[0],
    'react/no-multi-comp': [0],
    'react/jsx-filename-extension': [0],
    'react/react-in-jsx-scope': [0],
    'react/jsx-tag-spacing': [0],
    'react/jsx-space-before-closing': [0],
    'react/prefer-stateless-function': [0],
    'jsx-quotes': [0],
    'import/extensions': [0],
    'import/no-unresolved': [0],
    'space-before-function-paren': [0],
    'class-methods-use-this': [0],
    'import/no-named-as-default': [0],
    'import/no-extraneous-dependencies': [0],
    'global-require': [0],
    'no-param-reassign': [0],
    'react/require-default-props': [0],
    'react/forbid-prop-types': [0],
    'react/no-unused-prop-types': [1],
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
    'prettier/prettier': ['error', {
      'trailingComma': 'all',
      'singleQuote': true,
    }],
  },
  globals: {
    document: true,
    KeyframeEffect: true,
    require: true,
    window: true,
    it: true,
    describe: true,
    beforeAll: true,
    beforeEach: true,
    afterAll: true,
    afterEach: true,
    jest: true,
    expect: true
  },
  settings: {
    'import/resolver': {
      'babel-module': {}
    }
  }
}
