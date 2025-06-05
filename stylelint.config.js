export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  plugins: ['stylelint-scss'],
  rules: {
    // SCSS specific rules
    'scss/at-rule-no-unknown': true,
    'scss/selector-no-redundant-nesting-selector': true,

    // CSS rules that match your original ESLint rules
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'length-zero-no-unit': true,
    'property-no-unknown': true,

    // Disable some overly strict rules for flexibility
    'selector-class-pattern': null,
    'custom-property-pattern': null,
  },
  ignoreFiles: ['node_modules/**/*', '.next/**/*', 'dist/**/*', 'build/**/*'],
}
