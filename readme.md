<div align="center">
    <a href="https://beathers.bhoenixstudio.com">
        <img src="./public/images/logo.png" alt="Beathers logo" width="700" height="312">
    </a>
    <h1 align="center">Beathers <small>v5.0.0</small></h1>
    <p align="center">The Perfect Fusion of Strength and Featherlight Agility</p>
    <br>
    <br>
    <p align='center'>
    <a href="https://beathers.bhoenixstudio.com"><strong>Explore our documents</strong></a>
    <br>
    <a href="https://github.com/BhoenixStudio/Beathers/issues/new?template=bug_report.md">Report bug</a>
    ·
    <a href="https://github.com/BhoenixStudio/Beathers/issues/new?template=feature_request.md">Request feature</a>
    </p>
</div>

# Beathers

[![Version](https://img.shields.io/npm/v/beathers.svg)](https://www.npmjs.com/package/beathers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

Beathers is a lightweight, powerful SCSS library designed to accelerate your web development workflow. It offers a comprehensive suite of SCSS mixins, variables, and utility classes, enabling you to build responsive, visually appealing web applications with ease. Beathers focuses on providing reusable components, a flexible responsive grid system, and intuitive typography helpers, streamlining the process of creating modern user interfaces.

## Documentation

For detailed information on how to use the Beathers Library, consult the [official documentation](https://beathers.bhoenixstudio.com).
The documentation provides comprehensive guides, usage examples, and detailed explanations of all available mixins, variables, and utility classes.

## Installation

Install the package using npm:

```shell
npm install beathers
# or
yarn add beathers
# or
pnpm add beathers
```

## Quick Start

1. **Install** the package: `npm install beathers`
2. **Create** a `beathers.configs.json` file with your theme settings
3. **Build** your theme: `beathers build`
4. **Import** the generated CSS/SCSS files in your project

### Basic Example

```json
// beathers.configs.json
{
  "colors": {
    "primary": { "light": "#007bff", "dark": "#0056b3" }
  },
  "typography": {
    "defaultFontFamilies": ["Inter", "sans-serif"]
  }
}
```

## Imports

### CSS Import (Compiled)

```css
/* Import the main compiled CSS */
@import 'node_modules/beathers/dist/css/beathers.min.css';

/* Import icons separately */
@import 'node_modules/beathers/dist/css/beathers-icons.min.css';
```

### SCSS Import (Source)

```scss
// Import the entire library
@import 'node_modules/beathers/src/scss/beathers.min.scss';

// Or import individual modules
@import 'node_modules/beathers/src/scss/functions/colors';
@import 'node_modules/beathers/src/scss/style/grid';
@import 'node_modules/beathers/src/scss/style/typographic';

// Import using @use (with variables)
@use 'node_modules/beathers/src/scss/beathers.min.scss' as beathers;
@use 'node_modules/beathers/src/scss/functions/colors' as colors;

// Or use @use with * to import without namespace
@use 'node_modules/beathers/src/scss/functions/colors' as *;
```

### JavaScript/TypeScript Import

```javascript
// Next.js (pages/_app.js or app/layout.js)
import 'beathers/dist/css/beathers.min.css'

// React/Vue/Angular
import 'beathers/dist/css/beathers.min.css'

// Import types for TypeScript configs
import { Theme } from 'beathers'
```

## Configuration Options

Configure your theme using a `beathers.configs.json`, `beathers.configs.js`, or `beathers.configs.ts` file:

### Complete Configuration Reference

| Property                         | Type                            | Description                                   | Default Value                             | Example                                                |
| -------------------------------- | ------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------------------ |
| **COLORS**                       |                                 |                                               |                                           |                                                        |
| `colors`                         | `ColorType`                     | Custom color palette with light/dark variants | See default colors                        | `{"primary": {"light": "#007bff", "dark": "#0056b3"}}` |
| `colors.main`                    | `{light: string, dark: string}` | Main background color                         | `{"light": "#ffffff", "dark": "#1a1d21"}` | `{"light": "#f8f9fa", "dark": "#212529"}`              |
| `colors.second`                  | `{light: string, dark: string}` | Secondary background color                    | `{"light": "#f8f8ff", "dark": "#2e2e3f"}` | `{"light": "#e9ecef", "dark": "#495057"}`              |
| `colors.primary`                 | `{light: string, dark: string}` | Primary brand color                           | `undefined`                               | `{"light": "#007bff", "dark": "#0056b3"}`              |
| `colors.success`                 | `{light: string, dark: string}` | Success state color                           | `{"light": "#099750", "dark": "#5ff2a9"}` | `{"light": "#28a745", "dark": "#20c997"}`              |
| `colors.info`                    | `{light: string, dark: string}` | Information state color                       | `undefined`                               | `{"light": "#17a2b8", "dark": "#138496"}`              |
| `colors.warning`                 | `{light: string, dark: string}` | Warning state color                           | `undefined`                               | `{"light": "#ffc107", "dark": "#e0a800"}`              |
| `colors.danger`                  | `{light: string, dark: string}` | Error/danger state color                      | `undefined`                               | `{"light": "#dc3545", "dark": "#c82333"}`              |
| **TYPOGRAPHY**                   |                                 |                                               |                                           |                                                        |
| `typography`                     | `Typography`                    | Font configuration and text settings          | See typography defaults                   | `{"defaultFontFamilies": ["Inter", "sans-serif"]}`     |
| `typography.defaultFontFamilies` | `string[]`                      | Default font stack                            | `["system-ui", "sans-serif"]`             | `["Inter", "Roboto", "sans-serif"]`                    |
| `typography.fontMainPath`        | `string`                        | Path to font files                            | `""`                                      | `"/fonts/"`                                            |
| `typography.fontFormat`          | `"woff" \| "woff2"`             | Font file format                              | `"woff2"`                                 | `"woff"`                                               |
| `typography.fontWeights`         | `FontWeight[]`                  | Available font weights                        | `["regular", "medium", "bold"]`           | `["light", "regular", "bold"]`                         |
| `typography.fontStyles`          | `FontStyle[]`                   | Available font styles                         | `["normal"]`                              | `["normal", "italic"]`                                 |
| `typography.fontSizes`           | `Record<string, FontSize>`      | Named font sizes                              | `{"base": "16px", "lg": "18px"}`          | `{"sm": "14px", "base": "16px", "xl": "24px"}`         |
| `typography.textTruncate`        | `number`                        | Default text truncation width                 | `3`                                       | `5`                                                    |
| `typography.fonts`               | `Record<string, FontType>`      | Custom font definitions                       | `{}`                                      | `{"heading": {"weights": ["bold"]}}`                   |
| **SETTINGS**                     |                                 |                                               |                                           |                                                        |
| `settings`                       | `Settings`                      | Layout, breakpoints and spacing settings      | See settings defaults                     | `{"axisDivisions": 12}`                                |
| `settings.axisDivisions`         | `number`                        | Grid system divisions                         | `12`                                      | `16`                                                   |
| `settings.opacities`             | `number[]`                      | Available opacity values                      | `[0.1, 0.25, 0.5, 0.75, 0.9]`             | `[0.2, 0.4, 0.6, 0.8]`                                 |
| `settings.blurValues`            | `number[]`                      | Blur effect values                            | `[2, 4, 8, 16, 32]`                       | `[4, 8, 12]`                                           |
| `settings.insetValues`           | `number[]`                      | Inset shadow values                           | `[1, 2, 4, 8]`                            | `[2, 4, 6]`                                            |
| `settings.bordersValue`          | `number`                        | Default border width                          | `1`                                       | `2`                                                    |
| `settings.radiuses`              | `number[]`                      | Border radius values                          | `[4, 8, 12, 16, 24]`                      | `[6, 12, 18]`                                          |
| `settings.breakpoints`           | `Breakpoints`                   | Responsive breakpoints                        | See breakpoints                           | `{"sm": "640px", "md": "768px"}`                       |
| `settings.breakpoints.sm`        | `string`                        | Small breakpoint                              | `"576px"`                                 | `"640px"`                                              |
| `settings.breakpoints.md`        | `string`                        | Medium breakpoint                             | `"768px"`                                 | `"768px"`                                              |
| `settings.breakpoints.lg`        | `string`                        | Large breakpoint                              | `"992px"`                                 | `"1024px"`                                             |
| `settings.breakpoints.xl`        | `string`                        | Extra large breakpoint                        | `"1200px"`                                | `"1280px"`                                             |
| `settings.breakpoints.xxl`       | `string`                        | 2X large breakpoint                           | `"1400px"`                                | `"1536px"`                                             |
| `settings.wrappers`              | `Wrappers`                      | Container widths                              | See wrappers                              | `{"sm": {"width": "540px"}}`                           |
| `settings.guttersValues`         | `GutterValues`                  | Spacing values                                | See gutters                               | `{"auto": "1rem", 1: "0.25rem"}`                       |
| **ROLES**                        |                                 |                                               |                                           |                                                        |
| `roles`                          | `Roles`                         | Feature toggles for library modules           | All features enabled                      | `{"useColors": true, "useIcons": false}`               |
| `roles.useMediaQueries`          | `boolean`                       | Enable responsive utilities                   | `true`                                    | `false`                                                |
| `roles.useIcons`                 | `boolean`                       | Include icon styles                           | `true`                                    | `false`                                                |
| `roles.useFontFamilies`          | `boolean`                       | Include font family utilities                 | `true`                                    | `false`                                                |
| `roles.useFontSizes`             | `boolean`                       | Include font size utilities                   | `true`                                    | `false`                                                |
| `roles.useFontShapes`            | `boolean`                       | Include font style utilities                  | `true`                                    | `false`                                                |
| `roles.useTextAligns`            | `boolean`                       | Include text alignment utilities              | `true`                                    | `false`                                                |
| `roles.useTextTruncate`          | `boolean`                       | Include text truncation utilities             | `true`                                    | `false`                                                |
| `roles.useColors`                | `boolean`                       | Include color utilities                       | `true`                                    | `false`                                                |
| `roles.useColorsOpacities`       | `boolean`                       | Include color opacity utilities               | `true`                                    | `false`                                                |
| `roles.useColorsLightMode`       | `boolean`                       | Include light mode colors                     | `true`                                    | `false`                                                |
| `roles.useColorsDarkMode`        | `boolean`                       | Include dark mode colors                      | `true`                                    | `false`                                                |
| `roles.useCurrentColors`         | `boolean`                       | Include currentColor utilities                | `true`                                    | `false`                                                |
| `roles.useRootColors`            | `boolean`                       | Include CSS custom properties                 | `true`                                    | `false`                                                |
| `roles.useGrid`                  | `boolean`                       | Include grid system                           | `true`                                    | `false`                                                |
| `roles.useFlex`                  | `boolean`                       | Include flexbox utilities                     | `true`                                    | `false`                                                |
| `roles.useTransitions`           | `boolean`                       | Include transition utilities                  | `true`                                    | `false`                                                |
| `roles.useWrappers`              | `boolean`                       | Include container utilities                   | `true`                                    | `false`                                                |
| `roles.useShadows`               | `boolean`                       | Include shadow utilities                      | `true`                                    | `false`                                                |
| `roles.useDisplays`              | `boolean`                       | Include display utilities                     | `true`                                    | `false`                                                |
| `roles.useOverflows`             | `boolean`                       | Include overflow utilities                    | `true`                                    | `false`                                                |
| `roles.useOpacities`             | `boolean`                       | Include opacity utilities                     | `true`                                    | `false`                                                |
| `roles.useBlur`                  | `boolean`                       | Include blur utilities                        | `true`                                    | `false`                                                |
| `roles.useObjectFits`            | `boolean`                       | Include object-fit utilities                  | `true`                                    | `false`                                                |
| `roles.usePositions`             | `boolean`                       | Include positioning utilities                 | `true`                                    | `false`                                                |
| `roles.useInsets`                | `boolean`                       | Include inset utilities                       | `true`                                    | `false`                                                |
| `roles.useSizes`                 | `boolean`                       | Include sizing utilities                      | `true`                                    | `false`                                                |
| `roles.useGutters`               | `boolean`                       | Include spacing utilities                     | `true`                                    | `false`                                                |
| `roles.useBorders`               | `boolean`                       | Include border utilities                      | `true`                                    | `false`                                                |
| `roles.useTextBorders`           | `boolean`                       | Include text border utilities                 | `true`                                    | `false`                                                |
| `roles.useRadius`                | `boolean`                       | Include border radius utilities               | `true`                                    | `false`                                                |

### Example Configuration

```typescript
// beathers.configs.ts
import { Theme } from 'beathers'

export default {
  colors: {
    primary: { light: '#007bff', dark: '#0056b3' },
    secondary: { light: '#6c757d', dark: '#495057' },
    success: { light: '#28a745', dark: '#20c997' },
  },
  typography: {
    defaultFontFamilies: ['Inter', 'system-ui', 'sans-serif'],
    fontSizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
    },
  },
  settings: {
    axisDivisions: 12,
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
  },
  roles: {
    useIcons: false,
    useBlur: false,
  },
} satisfies Theme
```

## License

The Beathers Library is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any inquiries or feedback regarding the Beathers Library:

- 📧 Email: contact@bhoenixstudio.com
- 🌐 Website: [beathers.bhoenixstudio.com](https://beathers.bhoenixstudio.com)
- 💬 GitHub Issues: [Report bugs or request features](https://github.com/BhoenixStudio/Beathers/issues)
- 📚 Documentation: [Full documentation](https://beathers.bhoenixstudio.com)
