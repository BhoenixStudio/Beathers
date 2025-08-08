// General Types

/** CSS size unit values supporting px, rem, em, viewport units, and percentages */
type SizeUnit = 0 | `${number}px` | `${number}rem` | `${number}em` | `${number}vw` | `${number}vh` | `${number}%`

// Color Types

/** Color configuration object with optional light and dark theme hex values */
type ColorType = Record<string, { light?: `#${string}`; dark?: `#${string}` }>

// Font Types
/** Available font weight values from thin to black */
type FontWeight = 'thin' | 'extra-light' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extra-bold' | 'black'

/** Font style options for normal, italic, or oblique text */
type FontStyle = 'normal' | 'italic' | 'oblique'

interface FontVariant {
  /** Display name for the font variant */
  title: string

  /** Unicode range for the font variant */
  unicode?: string

  /** Font file format. */
  format?: 'woff' | 'woff2'

  /** Whether the font is locally installed. @default true */
  isLocal?: boolean

  /** Remote URL for downloading the font */
  url?: `https://${string}` | `http://${string}`
}

/** Font configuration with weights, styles, and variants */
type FontType = {
  /** Available font weights for this font family */
  weights?: FontWeight[]

  /** Available font styles for this font family */
  styles?: FontStyle[]

  /** Named font variants with specific configurations */
  variants?: Record<string, FontVariant>
}

interface Typography {
  /** Default font families to use as fallbacks */
  defaultFontFamilies?: string[]

  /** Base path for font files */
  fontMainPath?: string

  /** Default font format for all fonts. */
  fontFormat?: 'woff' | 'woff2'

  /** Global font weights available across all fonts */
  fontWeights?: FontWeight[]

  /** Global font styles available across all fonts */
  fontStyles?: FontStyle[]

  /** Named font sizes mapped to CSS size units */
  fontSizes?: Record<string, SizeUnit>

  /** Line counts for text truncation utilities */
  textTruncate?: number[]

  /** Font family configurations */
  fonts?: Record<string, FontType>
}

// Settings
interface Settings {
  /** Number of divisions for grid axis calculations. @default 12 */
  axisDivisions?: number

  /** Opacity values for transparency utilities (0-100 range) */
  opacities?: number[]

  /** Blur values in pixels for filter utilities */
  blurValues?: number[]

  /** Inset values for positioning utilities */
  insetValues?: number[]

  /** Border width values in pixels */
  bordersValue?: number[]

  /** Border radius values in pixels */
  radiuses?: number[]

  /** Responsive breakpoints for media queries */
  breakpoints?: Record<'null' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', 0 | SizeUnit>

  /** Container wrapper configurations for different breakpoints */
  wrappers?: Record<'null' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', { width: SizeUnit; padding?: SizeUnit }>

  /** Gutter values for spacing utilities */
  guttersValues?: Record<'auto' | number, 'auto' | SizeUnit>
}

interface Glass {
  blur?: 0 | `${number}px`
  glassColor?: { light?: `#${string}`; dark?: `#${string}` }
  borderThickness?: SizeUnit
  border1Color?: { light?: `#${string}`; dark?: `#${string}` }
  border2Color?: { light?: `#${string}`; dark?: `#${string}` }
  lightAngle?: `${number}deg`
}

/** Available feature keys for enabling/disabling CSS utilities */
type RoleKeys =
  | 'useMediaQueries'
  | 'useFontFamilies'
  | 'useFontFamiliesMediaQueries'
  | 'useFontSizes'
  | 'useFontSizesMediaQueries'
  | 'useFontShapes'
  | 'useFontShapesMediaQueries'
  | 'useTextAligns'
  | 'useTextAlignsMediaQueries'
  | 'useTextTruncate'
  | 'useTextTruncateMediaQueries'
  | 'useColors'
  | 'useColorMediaQueries'
  | 'useColorsOpacities'
  | 'useColorsLightMode'
  | 'useColorsDarkMode'
  | 'useCurrentColors'
  | 'useRootColors'
  | 'useGrid'
  | 'useFlex'
  | 'useGridMediaQueries'
  | 'useWrappers'
  | 'useWrapperMediaQueries'
  | 'useShadows'
  | 'useShadowsMediaQueries'
  | 'useDisplays'
  | 'useDisplaysMediaQueries'
  | 'useOverflows'
  | 'useOverflowsMediaQueries'
  | 'useOpacities'
  | 'useOpacitiesMediaQueries'
  | 'useBlur'
  | 'useBlurMediaQueries'
  | 'useObjectFits'
  | 'useObjectFitsMediaQueries'
  | 'usePositions'
  | 'usePositionsMediaQueries'
  | 'useInsets'
  | 'useInsetsMediaQueries'
  | 'useSizes'
  | 'useSizesMediaQueries'
  | 'useGutters'
  | 'useGuttersMediaQueries'
  | 'useBorders'
  | 'useBordersMediaQueries'
  | 'useTextBorders'
  | 'useTextBordersMediaQueries'
  | 'useRadius'
  | 'useRadiusMediaQueries'
  | 'useGlass'
  | 'useGlassMediaQueries'

/** Feature toggles for enabling/disabling CSS utility generation. @default all true */
type Roles = Partial<Record<RoleKeys, boolean>>

/** Main theme configuration object containing all design system settings */
interface Theme {
  /** Color palette definitions with light/dark theme support */
  colors?: ColorType

  /** Typography settings including fonts, sizes, and weights */
  typography?: Typography

  /** Framework settings for grid, spacing, and responsive behavior */
  settings?: Settings

  /** Feature flags for controlling which CSS utilities are generated */
  roles?: Roles

  /** Optional glassmorphism settings for frosted glass effects */
  glass?: Glass
}

export type {
  SizeUnit,
  ColorType,
  FontWeight,
  FontStyle,
  FontVariant,
  FontType,
  Typography,
  Settings,
  RoleKeys,
  Glass,
  Roles,
  Theme,
}
