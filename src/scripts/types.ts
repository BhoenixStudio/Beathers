// General Types
type SizeUnit = `${number}px` | `${number}rem` | `${number}em` | `${number}vw` | `${number}vh` | `${number}%`

// Color Types
type ColorType = Record<string, { light?: `#${string}`; dark?: `#${string}` }>

// Font Types
type FontWeight = 'thin' | 'extra-light' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extra-bold' | 'black'
type FontStyle = 'normal' | 'italic' | 'oblique'
interface FontVariant {
  title: string
  unicode?: string
  format?: 'woff' | 'woff2'
  isLocal?: boolean
  url?: `https://${string}` | `http://${string}`
}
type FontType = {
  weights?: FontWeight[]
  styles?: FontStyle[]
  variants?: Record<string, FontVariant>
}

interface Typography {
  defaultFontFamilies?: string[]
  fontMainPath?: string
  fontFormat?: 'woff' | 'woff2'
  fontWeights?: FontWeight[]
  fontStyles?: FontStyle[]
  fontSizes?: Record<string, SizeUnit>
  textTruncate?: number[]
  fonts?: Record<string, FontType>
}

// Settings
interface Settings {
  axisDivisions?: number
  opacities?: number[]
  blurValues?: number[]
  insetValues?: number[]
  bordersValue?: number[]
  radiuses?: number[]
  breakpoints?: Record<'null' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', 0 | SizeUnit>
  wrappers?: Record<'null' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', { width: SizeUnit; padding?: SizeUnit }>
  guttersValues?: Record<'auto' | number, 'auto' | SizeUnit>
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

type Roles = Partial<Record<RoleKeys, boolean>>

interface Theme {
  colors?: ColorType
  typography?: Typography
  settings?: Settings
  roles?: Roles
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
  Roles,
  Theme,
}
