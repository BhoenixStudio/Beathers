/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs-extra'
import { ColorType, FontType, Settings, SizeUnit, Theme } from '../types.js'

function sanitize(val: any): any {
  if (typeof val === 'string') {
    const trimmed = val.trim()
    if (trimmed === 'true') return true
    if (trimmed === 'false') return false
    if (!isNaN(Number(trimmed))) return Number(trimmed)
    return trimmed
  }

  if (typeof val === 'object' && val !== null)
    return Object.fromEntries(Object.entries(val).map(([k, v]) => [sanitize(k), sanitize(v)]))

  return val
}

function cleanString(value: string): string {
  let result: any = value
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
    result = value.slice(1, -1)

  return result.trim()
}

function cleanNumber(value: string): number | null {
  let result = null

  const num = Number(value)
  if (!isNaN(num) && num.toString() === value) result = num

  return result
}

function buildArray(value: string): any[] {
  if (!value.includes(',') && !value.startsWith('(') && !value.endsWith(')')) return []

  let raw: string = value
  if (value.startsWith('(') && value.endsWith(')')) raw = value.slice(1, -1)

  return raw.split(',').map((part) => cleanNumber(part.trim()) ?? cleanString(part.trim()))
}

function buildJson<T>(value: string): T {
  const raw = value
    .replace(/\(/g, '{')
    .replace(/\)/g, '}')
    .replace(/'/g, '"')
    .replace(/([a-zA-Z0-9_]+):/g, '"$1":')
    .replace(/:\s*"?([0-9]+)"?\.(\d+)(rem)?/g, ':"$1.$2$3"')
    .replace(/:\s*([a-zA-Z0-9_]+)/g, ': "$1"')
    .replace(/,\s*}/g, '\n}')

  const parsed: T = JSON.parse(raw)
  const sanitized = sanitize(parsed)

  return sanitized
}

function buildColors(value: string): ColorType {
  const raw = value
    .replace(/\(/g, '{')
    .replace(/\)/g, '}')
    .replace(/'/g, '"')
    .replace(/#([0-9a-fA-F]{3,6})/g, '"#$1"')
    .replace(/,\s*}/g, '}')
    .replace(/\n\s*/g, '')

  const parsed: ColorType = JSON.parse(raw)
  return parsed
}

function buildWrappers(value: string): Settings['wrappers'] {
  const raw = value
    .replace(/\(/g, '{')
    .replace(/\)/g, '}')
    .replace(/([a-zA-Z0-9_]+):\s*([0-9%px]+)\s+([0-9.]+rem)/g, '"$1": {"width": "$2", "padding": "$3"}')
    .replace(/,\s*}/g, '}')

  const parsed: Settings['wrappers'] = JSON.parse(raw)
  return parsed
}

export async function ReadDefaultValues(files: string[], VariableNames: string[]): Promise<Partial<Theme>> {
  const theme: Partial<Theme> = {}
  const variables: Record<string, any> = {}

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    for (const name of VariableNames) {
      const variableRegex = new RegExp(`^\\s*\\$${name}\\s*:\\s*([\\s\\S]*?)\\s*!default\\s*;?`, 'm')
      const match = variableRegex.exec(content)

      if (match) {
        const value = match[1].trim()

        let result: any
        if (name === 'colors') result = buildColors(value)
        else if (name === 'fonts') result = buildJson<Record<string, FontType>>(value)
        else if (name === 'fontSizes') result = buildJson<Record<string, SizeUnit>>(value)
        else if (name === 'breakpoints') result = buildJson<Settings['breakpoints']>(value)
        else if (name === 'wrappers') result = buildWrappers(value)
        else if (name === 'guttersValues') result = buildJson<Settings['guttersValues']>(value)
        else if (['true', 'false'].includes(value)) result = value === 'true'
        else if (
          [
            'fontWeights',
            'fontStyles',
            'textTruncate',
            'opacities',
            'blurValues',
            'radiuses',
            'defaultFontFamilies',
            'insetValues',
            'bordersValue',
          ].includes(name)
        )
          result = buildArray(value)
        else if (['axisDivisions'].includes(name)) result = cleanNumber(value)
        else if (['glassColor', 'glassBorder1Color', 'glassBorder2Color'].includes(name)) result = buildColors(value)
        else result = cleanString(value)

        variables[name] = result
      }
    }
  }

  theme.outputPath = variables?.outputPath
  theme.colors = variables?.colors
  theme.typography = {
    fontMainPath: variables?.fontMainPath,
    fontFormat: variables?.fontFormat,
    fontWeights: variables?.fontWeights,
    fontStyles: variables?.fontStyles,
    textTruncate: variables?.textTruncate,
    defaultFontFamilies: variables?.defaultFontFamilies,
    fonts: variables?.fonts,
    fontSizes: variables?.fontSizes,
  }
  theme.settings = {
    axisDivisions: variables?.axisDivisions,
    opacities: variables?.opacities,
    blurValues: variables?.blurValues,
    insetValues: variables?.insetValues,
    bordersValue: variables?.bordersValue,
    radiuses: variables?.radiuses,
    breakpoints: variables.breakpoints,
    wrappers: variables.wrappers,
    guttersValues: variables.guttersValues,
  }
  theme.roles = {
    useMediaQueries: variables?.useMediaQueries,
    useFontFamilies: variables?.useFontFamilies,
    useFontFamiliesMediaQueries: variables?.useFontFamiliesMediaQueries,
    useFontSizes: variables?.useFontSizes,
    useFontSizesMediaQueries: variables?.useFontSizesMediaQueries,
    useFontShapes: variables?.useFontShapes,
    useFontShapesMediaQueries: variables?.useFontShapesMediaQueries,
    useTextAligns: variables?.useTextAligns,
    useTextAlignsMediaQueries: variables?.useTextAlignsMediaQueries,
    useTextTruncate: variables?.useTextTruncate,
    useTextTruncateMediaQueries: variables?.useTextTruncateMediaQueries,
    useColors: variables?.useColors,
    useColorsOpacities: variables?.useColorsOpacities,
    useColorsLightMode: variables?.useColorsLightMode,
    useColorsDarkMode: variables?.useColorsDarkMode,
    useCurrentColors: variables?.useCurrentColors,
    useRootColors: variables?.useRootColors,
    useGrid: variables?.useGrid,
    useFlex: variables?.useFlex,
    useGridMediaQueries: variables?.useGridMediaQueries,
    useWrappers: variables?.useWrappers,
    useShadows: variables?.useShadows,
    useShadowsMediaQueries: variables?.useShadowsMediaQueries,
    useDisplays: variables?.useDisplays,
    useDisplaysMediaQueries: variables?.useDisplaysMediaQueries,
    useOverflows: variables?.useOverflows,
    useOverflowsMediaQueries: variables?.useOverflowsMediaQueries,
    useOpacities: variables?.useOpacities,
    useOpacitiesMediaQueries: variables?.useOpacitiesMediaQueries,
    useBlur: variables?.useBlur,
    useBlurMediaQueries: variables?.useBlurMediaQueries,
    useObjectFits: variables?.useObjectFits,
    useObjectFitsMediaQueries: variables?.useObjectFitsMediaQueries,
    usePositions: variables?.usePositions,
    usePositionsMediaQueries: variables?.usePositionsMediaQueries,
    useInsets: variables?.useInsets,
    useInsetsMediaQueries: variables?.useInsetsMediaQueries,
    useSizes: variables?.useSizes,
    useSizesMediaQueries: variables?.useSizesMediaQueries,
    useGutters: variables?.useGutters,
    useGuttersMediaQueries: variables?.useGuttersMediaQueries,
    useBorders: variables?.useBorders,
    useBordersMediaQueries: variables?.useBordersMediaQueries,
    useTextBorders: variables?.useTextBorders,
    useTextBordersMediaQueries: variables?.useTextBordersMediaQueries,
    useRadius: variables?.useRadius,
    useRadiusMediaQueries: variables?.useRadiusMediaQueries,
    useGlass: variables?.useGlass,
  }
  theme.glass = {
    blur: variables?.glassBlur,
    glassColor: variables?.glassColor,
    borderThickness: variables?.glassBorderThickness,
    border1Color: variables?.glassBorder1Color,
    border2Color: variables?.glassBorder2Color,
    lightAngle: variables?.glassLightAngle,
  }

  return theme
}
