/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs-extra'
import { Theme } from './types.js'

function splitScssItems(str: string, delimiter: string): string[] {
  const result: string[] = []
  let currentItem = ''
  let parenthesesDepth = 0
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (char === '(') parenthesesDepth++
    else if (char === ')') parenthesesDepth--
    else if (char === delimiter && parenthesesDepth === 0) {
      result.push(currentItem.trim())
      currentItem = ''
      continue
    }
    currentItem += char
  }
  if (currentItem.trim() !== '') result.push(currentItem.trim())
  return result
}

function splitScssKeyValuePair(item: string): { key: string; value: string } | null {
  let parenthesesDepth = 0
  for (let i = 0; i < item.length; i++) {
    if (item[i] === '(') parenthesesDepth++
    else if (item[i] === ')') parenthesesDepth--
    else if (item[i] === ':' && parenthesesDepth === 0)
      return { key: item.substring(0, i).trim(), value: item.substring(i + 1).trim() }
  }
  return null
}

function parseScssValue(value: string): any {
  value = value.trim()

  let result: any = value

  if (value === 'true') result = true
  if (value === 'false') result = false

  const num = Number(value)
  if (!isNaN(num) && num.toString() === value) result = num

  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
    result = value.slice(1, -1)

  if (value.startsWith('(') && value.endsWith(')')) {
    const content = value.slice(1, -1).trim()
    if (content === '') result = []

    const items = splitScssItems(content, ',')
    let isMap = false
    if (items.length > 0) {
      const firstItemPair = splitScssKeyValuePair(items[0])
      if (firstItemPair) isMap = items.every((item) => splitScssKeyValuePair(item) !== null)
    }

    if (!isMap) result = items.map((item) => parseScssValue(item))
    else {
      const map: Record<string, any> = {}
      for (const item of items) {
        const pair = splitScssKeyValuePair(item)
        if (pair) {
          let key = pair.key
          if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'")))
            key = key.slice(1, -1)

          map[key] = parseScssValue(pair.value)
        }
      }
      result = map
    }
  }

  if (value.includes(',') && !value.startsWith('(') && !value.endsWith(')')) {
    result = value
      .split(',')
      .map((part) => part.trim())
      .map((part) => parseScssValue(part))
  }

  return result
}

export async function ReadDefaultValues(files: string[]): Promise<Partial<Theme>> {
  const theme: Partial<Theme> = {}
  const variables: Record<string, any> = {}
  const regex = /^\s*\$([a-zA-Z0-9_-]+)\s*:\s*((?:.|\n)*?)\s*!default\s*;/gm

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    let match
    while ((match = regex.exec(content)) !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, name, value] = match
      variables[name] = parseScssValue(value)
    }
  }
  // console.log(variables)

  theme.colors = variables?.colors
  theme.typography = {
    fontMainPath: variables?.fontMainPath,
    fontFormat: variables?.fontFormat,
    fontWeights: variables?.fontWeights,
    fontStyles: variables?.fontStyles,
    textTruncate: variables?.textTruncate,
    // defaultFontFamilies: variables?.defaultFontFamilies,
    // fonts: variables?.fonts,
    // fontSizes: variables?.fontSizes,
  }
  theme.settings = {
    axisDivisions: variables?.axisDivisions,
    opacities: variables?.opacities,
    blurValues: variables?.blurValues,
    insetValues: variables?.insetValues,
    bordersValue: variables?.bordersValue,
    radiuses: variables?.radiuses,
  }
  // theme.breakPoints = {}
  // theme.wrappers = {}
  // theme.gutters = {}
  theme.roles = {
    useMediaQueries: variables?.useMediaQueries,
    useIcons: variables?.useIcons,
    useFontFamilies: variables?.useFontFamilies,
    useFontSizes: variables?.useFontSizes,
    useFontShapes: variables?.useFontShapes,
    useTextAligns: variables?.useTextAligns,
    useTextTruncate: variables?.useTextTruncate,
    useColors: variables?.useColors,
    useColorsOpacities: variables?.useColorsOpacities,
    useColorsLightMode: variables?.useColorsLightMode,
    useColorsDarkMode: variables?.useColorsDarkMode,
    useCurrentColors: variables?.useCurrentColors,
    useRootColors: variables?.useRootColors,
    useGrid: variables?.useGrid,
    useFlex: variables?.useFlex,
    useTransitions: variables?.useTransitions,
    useWrappers: variables?.useWrappers,
    useShadows: variables?.useShadows,
    useDisplays: variables?.useDisplays,
    useOverflows: variables?.useOverflows,
    useOpacities: variables?.useOpacities,
    useBlur: variables?.useBlur,
    useObjectFits: variables?.useObjectFits,
    usePositions: variables?.usePositions,
    useInsets: variables?.useInsets,
    useSizes: variables?.useSizes,
    useGutters: variables?.useGutters,
    useBorders: variables?.useBorders,
    useTextBorders: variables?.useTextBorders,
    useRadius: variables?.useRadius,
  }

  // console.log(theme)
  return theme
}
