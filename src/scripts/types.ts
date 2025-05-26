// Color Types
export type ColorType = {
  light: `#${string}`
  dark: `#${string}`
}

export interface ColorMap {
  [colorName: string]: ColorType
}

// Font Types
export type FontWeight =
  | 'thin'
  | 'extra-light'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extra-bold'
  | 'black'
export type FontStyle = 'normal' | 'italic' | 'oblique'
export type FontSize = `${number}px` | `${number}rem` | `${number}em`
export interface FontVariant {
  title: string
  unicode?: string
  format?: 'woff' | 'woff2'
  isLocal?: boolean
  url?: `https://${string}` | `http://${string}`
}
export type FontType = {
  weights?: FontWeight[]
  styles?: FontStyle[]
  variants?: FontVariant[]
}

export interface Typography {
  defaultFontFamilies?: string[]
  fontMainPath?: string
  fontFormat?: 'woff' | 'woff2'
  fontWeights?: FontWeight[]
  fontStyles?: FontStyle[]
  fontSizes?: { [sizeName: string]: FontSize }
  textTruncate?: number
  fonts?: { [fontName: string]: FontType }
}

// Settings
export type BreakPoints = {
  [key in 'sm' | 'md' | 'lg' | 'xl' | 'xxl']: `${number}px` | `${number}rem` | `${number}em`
}
export type Wrappers = {
  [key in 'sm' | 'md' | 'lg' | 'xl' | 'xxl']: {
    width: `${number}px` | `${number}rem` | `${number}em`
    padding?: `${number}px` | `${number}rem` | `${number}em`
  }
}
export type GutterValues = {
  [key in 'auto' | number]: 'auto' | `${number}px` | `${number}rem` | `${number}em`
}
export interface Settings {
  axisDivisions?: number
  opacities?: number[]
  blurValues?: number[]
  insetValues?: number[]
  bordersValue?: number[]
  radiuses?: number[]
}
type RoleKeys =
  | 'useMediaQueries'
  | 'useIcons'
  | 'useFontFamilies'
  | 'useFontSizes'
  | 'useFontShapes'
  | 'useTextAligns'
  | 'useTextTruncate'
  | 'useColors'
  | 'useColorsOpacities'
  | 'useColorsLightMode'
  | 'useColorsDarkMode'
  | 'useCurrentColors'
  | 'useRootColors'
  | 'useGrid'
  | 'useFlex'
  | 'useTransitions'
  | 'useWrappers'
  | 'useShadows'
  | 'useDisplays'
  | 'useOverflows'
  | 'useOpacities'
  | 'useBlur'
  | 'useObjectFits'
  | 'usePositions'
  | 'useInsets'
  | 'useSizes'
  | 'useGutters'
  | 'useBorders'
  | 'useTextBorders'
  | 'useRadius'

export type Roles = Partial<Record<RoleKeys, boolean>>

export interface Theme {
  colors?: ColorMap
  typography?: Typography
  settings?: Settings
  breakPoints?: BreakPoints
  wrappers?: Wrappers
  gutters?: GutterValues
  roles?: Roles
}
