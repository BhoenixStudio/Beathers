<div align="center">
    <img src="https://unpkg.com/beathers@latest/public/images/logo.png" alt="Beathers logo" width="700" height="312">
    <p align="center">The Perfect Fusion of Strength and Featherlight Agility</p>
</div>

[![Version](https://img.shields.io/npm/v/beathers.svg?color=orange)](https://www.npmjs.com/package/beathers)
[![License](https://img.shields.io/badge/license-MIT-black.svg)](https://opensource.org/licenses/MIT)
[![Changelog](https://img.shields.io/badge/Changelog-View-blue?style=flat)](https://www.npmjs.com/package/beathers?activeTab=code)


Beathers is a lightweight, powerful SCSS library designed to accelerate your web development workflow.**Everything is fully customizable** through a simple configuration file, allowing you to tailor every aspect to match your brand and requirements. It offers a comprehensive suite of SCSS mixins, variables, and utility classes, enabling you to build responsive, visually appealing web applications with complete design control.

## Get Started

### Installation

```bash
npm install beathers
# or
yarn add beathers
# or
pnpm add beathers
```

### Create Configuration File

Use the interactive CLI to create your theme configuration:

```bash
npx beathers init
```

This will prompt you to:

- Choose your configuration file format (JSON, JS, or TypeScript)
- Set up initial theme values like colors and typography
- Configure which features to enable/disable

### Build Your Theme

Generate your custom CSS from the configuration:

```bash
npx beathers build
```

### CLI Commands

Beathers provides a comprehensive set of CLI commands to manage your design system:

#### Configuration

- `npx beathers init` - Initialize a new configuration file
- `npx beathers build` - Build theme from configuration
- `npx beathers build --local` - Build with custom output path

#### Font Management

- `npx beathers add-font` - Add a new font to your configuration
- `npx beathers remove-font` - Remove a font from your configuration
- `npx beathers import-font-sample` - Import a sample font configuration

#### Color Management

- `npx beathers add-colors` - Add new colors to your configuration
- `npx beathers remove-color` - Remove a color from your configuration
- `npx beathers import-color-pack` - Import a complete color pack from available packs
- `npx beathers import-color` - Import a specific color from available packs

#### Help & Information

- `npx beathers --help` - Show all available commands
- `npx beathers --version` - Show current version

### Import in Your Project

**CSS Import (Recommended):**

```css
/* Import the compiled CSS */
@import 'node_modules/beathers/dist/css/beathers.min.css';
```

**SCSS Import:**

```scss
// Import the entire library
@import 'node_modules/beathers/src/scss/beathers.min.scss';

// Or import specific modules
@import 'node_modules/beathers/src/scss/functions/colors';
@import 'node_modules/beathers/src/scss/style/grid';
```

**JavaScript/Framework Import:**

```javascript
// Next.js, React, Vue, Angular
import 'beathers/dist/css/beathers.min.css'
```

### Example Configuration

```json
{
  "colors": {
    "primary": { "light": "#007bff", "dark": "#0056b3" },
    "success": { "light": "#28a745", "dark": "#20c997" }
  },
  "typography": {
    "defaultFontFamilies": ["Inter", "system-ui", "sans-serif"]
  },
  "settings": {
    "axisDivisions": 12,
    "breakpoints": {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px"
    }
  }
}
```

## Configuration

Beathers uses a configuration file to customize your theme. All options are optional and have sensible defaults.

### Configuration File Options

You can create one of these files in your project root:

- `beathers.configs.json` - JSON format
- `beathers.configs.js` - JavaScript format
- `beathers.configs.ts` - TypeScript format (with type safety)

### Key Configuration Sections

| Section        | Description                                        | Purpose                                             |
| -------------- | -------------------------------------------------- | --------------------------------------------------- |
| **colors**     | Define your color palette with light/dark variants | Brand colors, state colors (success, warning, etc.) |
| **typography** | Configure fonts, sizes, and text settings          | Font families, weights, sizes, and formatting       |
| **settings**   | Layout and spacing configuration                   | Grid system, breakpoints, spacing values            |
| **roles**      | Enable/disable specific features                   | Control which utilities are generated               |

### Common Configuration Properties

| Property                                                                        | Type                                                                                                                                                                                                              | Example                                                                                                                                                        |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **COLORS**                                                                      |
| `color` <br /> Color variants (as json)                                         | "color": { light: `#${string}$`, dark: `#${string}$` }                                                                                                                                                            | "primary": {"light": "#007bff", "dark": "#0056b3"}                                                                                                             |
| **TYPOGRAPHY**                                                                  |
| `defaultFontFamilies` <br /> Fallback fonts (as array)                          | `string[]`                                                                                                                                                                                                        | ["system-ui", "sans-serif"]                                                                                                                                    |
| `fontMainPath` <br /> Your fonts path                                           | `string`                                                                                                                                                                                                          | "/fonts/"                                                                                                                                                      |
| `fontFormat` <br /> Your fonts format                                           | `string`                                                                                                                                                                                                          | "woff2"                                                                                                                                                        |
| `fontWeights` <br /> Your fonts weights (as array)                              | `thin`,`extra-light`,`light`,`regular`,<br />`medium`,`semibold`,`bold`,`extra-bold`,`black`                                                                                                                      | ["regular", "medium", "bold"]                                                                                                                                  |
| `fontStyles` <br /> Your fonts styles (as array)                                | `normal`,`italic`,`oblique`                                                                                                                                                                                       | ["normal"]                                                                                                                                                     |
| `fontSizes` <br /> Your fonts sizes (as json)                                   | Record<`string`, `${number}px` `${number}rem` `${number}em`>                                                                                                                                                      | subtitle1: "16px" <br /> (Azvailable: h1, h2, h3, h4, h5, h6, subtitle1, subtitle2, button, body1, body2, caption, overline) <br /> (Note: You can add/remove) |
| `textTruncate` <br /> Text truncation                                           | `number`                                                                                                                                                                                                          | 3                                                                                                                                                              |
| `fonts` <br /> Custom font definitions <br /> (Local/External) (as json)        | {weights: same as `weights`, styles: same as `styles`, <br /> variants: {"fontName" :{title: `string`, unicode?: `string`, format?: `woff`, isLocal?: `boolean`, url?: `https://${string}`, `http://${string}`}}} | {variants: {"font1" :{title: "roboto"}}}                                                                                                                       |
| **SETTINGS**                                                                    |
| `axisDivisions` <br /> Grid system divisions                                    | `number`                                                                                                                                                                                                          | 12                                                                                                                                                             |
| `opacities` <br /> Available opacity values <br /> min: 0 - max: 100 (as array) | `number[]`                                                                                                                                                                                                        | [10, 20]                                                                                                                                                       |
| `blurValues` <br /> Blur effect values (as array)                               | `number[]`                                                                                                                                                                                                        | [2, 4, 8, 16, 32]                                                                                                                                              |
| `insetValues` <br /> Inset values (as array)                                    | `number[]`                                                                                                                                                                                                        | [0, 5]                                                                                                                                                         |
| `bordersValue` <br /> Default border width (as array)                           | `number[]`                                                                                                                                                                                                        | [1, 2]                                                                                                                                                         |
| `radiuses` <br /> Border radius values (as array)                               | `number[]`                                                                                                                                                                                                        | [5,10,15]                                                                                                                                                      |
| `breakpoints` <br /> Responsive breakpoints (as json)                           | Record<(`sm` , `md` , `lg` , `xl` , `xxl`), `${number}px` `${number}rem` `${number}em`>                                                                                                                           | {"sm": "640px", "md": "768px"}                                                                                                                                 |
| `wrappers` <br /> Container widths (as json)                                    | Record<(`sm` , `md` , `lg` , `xl` , `xxl`), { width: `${number}px` `${number}rem` `${number}em`; padding?: `${number}px` `${number}rem` `${number}em`}>                                                           | {"sm": {"width": "540px", "padding":"15px"}}                                                                                                                   |
| `guttersValues` <br /> Spacing values (as json)                                 | Record<(`auto`, `number`), `${number}px` `${number}rem` `${number}em`>                                                                                                                                            | {"auto": "1rem", 1: "0.25rem"}                                                                                                                                 |
| **ROLES**                                                                       |
| `useMediaQueries` <br /> Enable responsive utilities                            | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useIcons` <br /> Include icon styles                                           | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useFontFamilies` <br /> Include font family utilities                          | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useFontSizes` <br /> Include font size utilities                               | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useFontShapes` <br /> Include font style utilities                             | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useTextAligns` <br /> Include text alignment utilities                         | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useTextTruncate` <br /> Include text truncation utilities                      | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useColors` <br /> Include color utilities                                      | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useColorsOpacities` <br /> Include color opacity utilities                     | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useColorsLightMode` <br /> Include light mode colors                           | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useColorsDarkMode` <br /> Include dark mode colors                             | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useCurrentColors` <br /> Include currentColor utilities                        | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useRootColors` <br /> Include CSS custom properties                            | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useGrid` <br /> Include grid system                                            | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useFlex` <br /> Include flexbox utilities                                      | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useTransitions` <br /> Include transition utilities                            | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useWrappers` <br /> Include container utilities                                | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useShadows` <br /> Include shadow utilities                                    | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useDisplays` <br /> Include display utilities                                  | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useOverflows` <br /> Include overflow utilities                                | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useOpacities` <br /> Include opacity utilities                                 | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useBlur` <br /> Include blur utilities                                         | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useObjectFits` <br /> Include object-fit utilities                             | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `usePositions` <br /> Include positioning utilities                             | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useInsets` <br /> Include inset utilities                                      | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useSizes` <br /> Include sizing utilities                                      | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useGutters` <br /> Include spacing utilities                                   | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useBorders` <br /> Include border utilities                                    | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useTextBorders` <br /> Include text border utilities                           | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |
| `useRadius` <br /> Include border radius utilities                              | `boolean`                                                                                                                                                                                                         | `true`                                                                                                                                                         |

### TypeScript Configuration Example

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

## Contact & Support

[![Website](https://img.shields.io/badge/Website-bhoenixstudio.com/beathers-blue?style=for-the-badge&logo=globe)](https://bhoenixstudio.com/beathers)

[![Documentation](https://img.shields.io/badge/Documentation-Full%20Docs-green?style=for-the-badge&logo=book)](https://bhoenixstudio.com/beathers)

[![Email](https://img.shields.io/badge/Email-contact@bhoenixstudio.com-red?style=for-the-badge&logo=gmail)](mailto:contact@bhoenixstudio.com)
