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

### Next.js Configuration

```javascript
// next.config.js
module.config = {
  // Enable SCSS support
  sassOptions: {
    includePaths: ['./node_modules'],
  },
}
```

## Configuration Options

Configure your theme using a `beathers.configs.json`, `beathers.configs.js`, or `beathers.configs.ts` file:

### Complete Configuration Reference

| Property       | Type         | Description                                   | Default Value           |
| -------------- | ------------ | --------------------------------------------- | ----------------------- |
| **colors**     | `ColorType`  | Custom color palette with light/dark variants | See default colors      |
| **typography** | `Typography` | Font configuration and text settings          | See typography defaults |
| **settings**   | `Settings`   | Layout, breakpoints and spacing settings      | See settings defaults   |
| **roles**      | `Roles`      | Feature toggles for library modules           | All features enabled    |

### Colors Configuration

| Property   | Type                            | Description                                     | Example                                                |
| ---------- | ------------------------------- | ----------------------------------------------- | ------------------------------------------------------ |
| `colors.*` | `{light: string, dark: string}` | Color definitions with light/dark mode variants | `{"primary": {"light": "#007bff", "dark": "#0056b3"}}` |

**Default Colors**: `main`, `second`, `third`, `t1`, `t2`, `t3`, `d1`, `d2`, `d3`, `success`, `info`, `warning`, `danger`

### Typography Configuration

| Property              | Type                       | Description                   | Default                          |
| --------------------- | -------------------------- | ----------------------------- | -------------------------------- |
| `defaultFontFamilies` | `string[]`                 | Default font stack            | `["system-ui", "sans-serif"]`    |
| `fontMainPath`        | `string`                   | Path to font files            | `""`                             |
| `fontFormat`          | `"woff" \| "woff2"`        | Font file format              | `"woff2"`                        |
| `fontWeights`         | `FontWeight[]`             | Available font weights        | `["regular", "medium", "bold"]`  |
| `fontStyles`          | `FontStyle[]`              | Available font styles         | `["normal"]`                     |
| `fontSizes`           | `Record<string, FontSize>` | Named font sizes              | `{"base": "16px", "lg": "18px"}` |
| `textTruncate`        | `number`                   | Default text truncation width | `3`                              |
| `fonts`               | `Record<string, FontType>` | Custom font definitions       | `{}`                             |

**Font Weights**: `thin`, `extra-light`, `light`, `regular`, `medium`, `semibold`, `bold`, `extra-bold`, `black`

**Font Styles**: `normal`, `italic`, `oblique`

### Settings Configuration

| Property        | Type           | Description              | Default                       |
| --------------- | -------------- | ------------------------ | ----------------------------- |
| `axisDivisions` | `number`       | Grid system divisions    | `12`                          |
| `opacities`     | `number[]`     | Available opacity values | `[0.1, 0.25, 0.5, 0.75, 0.9]` |
| `blurValues`    | `number[]`     | Blur effect values       | `[2, 4, 8, 16, 32]`           |
| `insetValues`   | `number[]`     | Inset shadow values      | `[1, 2, 4, 8]`                |
| `bordersValue`  | `number`       | Default border width     | `1`                           |
| `radiuses`      | `number[]`     | Border radius values     | `[4, 8, 12, 16, 24]`          |
| `breakpoints`   | `Breakpoints`  | Responsive breakpoints   | See breakpoints               |
| `wrappers`      | `Wrappers`     | Container widths         | See wrappers                  |
| `guttersValues` | `GutterValues` | Spacing values           | See gutters                   |

### Breakpoints (px)

| Key   | Default Value |
| ----- | ------------- |
| `sm`  | `576px`       |
| `md`  | `768px`       |
| `lg`  | `992px`       |
| `xl`  | `1200px`      |
| `xxl` | `1400px`      |

### Roles Configuration (Feature Toggles)

| Property             | Description                       | Default |
| -------------------- | --------------------------------- | ------- |
| `useMediaQueries`    | Enable responsive utilities       | `true`  |
| `useIcons`           | Include icon styles               | `true`  |
| `useFontFamilies`    | Include font family utilities     | `true`  |
| `useFontSizes`       | Include font size utilities       | `true`  |
| `useFontShapes`      | Include font style utilities      | `true`  |
| `useTextAligns`      | Include text alignment utilities  | `true`  |
| `useTextTruncate`    | Include text truncation utilities | `true`  |
| `useColors`          | Include color utilities           | `true`  |
| `useColorsOpacities` | Include color opacity utilities   | `true`  |
| `useColorsLightMode` | Include light mode colors         | `true`  |
| `useColorsDarkMode`  | Include dark mode colors          | `true`  |
| `useCurrentColors`   | Include currentColor utilities    | `true`  |
| `useRootColors`      | Include CSS custom properties     | `true`  |
| `useGrid`            | Include grid system               | `true`  |
| `useFlex`            | Include flexbox utilities         | `true`  |
| `useTransitions`     | Include transition utilities      | `true`  |
| `useWrappers`        | Include container utilities       | `true`  |
| `useShadows`         | Include shadow utilities          | `true`  |
| `useDisplays`        | Include display utilities         | `true`  |
| `useOverflows`       | Include overflow utilities        | `true`  |
| `useOpacities`       | Include opacity utilities         | `true`  |
| `useBlur`            | Include blur utilities            | `true`  |
| `useObjectFits`      | Include object-fit utilities      | `true`  |
| `usePositions`       | Include positioning utilities     | `true`  |
| `useInsets`          | Include inset utilities           | `true`  |
| `useSizes`           | Include sizing utilities          | `true`  |
| `useGutters`         | Include spacing utilities         | `true`  |
| `useBorders`         | Include border utilities          | `true`  |
| `useTextBorders`     | Include text border utilities     | `true`  |
| `useRadius`          | Include border radius utilities   | `true`  |

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

## Contributing

We welcome contributions from the community to improve the Beathers Library! Here's how you can help:

### Reporting Issues

- Search existing issues before creating a new one
- Use the issue templates for bug reports and feature requests
- Provide clear reproduction steps and environment details

## License

The Beathers Library is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any inquiries or feedback regarding the Beathers Library:

- 📧 Email: contact@bhoenixstudio.com
- 🌐 Website: [beathers.bhoenixstudio.com](https://beathers.bhoenixstudio.com)
- 💬 GitHub Issues: [Report bugs or request features](https://github.com/BhoenixStudio/Beathers/issues)
- 📚 Documentation: [Full documentation](https://beathers.bhoenixstudio.com)
