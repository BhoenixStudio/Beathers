export default {
  customSyntax: 'postcss-scss',
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss'],
  rules: {
    'declaration-no-important': [true, { severity: 'warning' }],
    'scss/at-rule-no-unknown': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'length-zero-no-unit': true,
    'property-no-unknown': true,
  },
  ignoreFiles: ['node_modules/**/*', '.next/**/*', 'dist/**/*', 'build/**/*'],
}
