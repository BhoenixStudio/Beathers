import { Theme } from '../types.js'

function BuildColors(colors: Theme['colors']): string {
  let scss: string = '\n\n// --- Colors ---\n'

  if (colors) {
    scss += '$colors: (\n'
    for (const [name, modes] of Object.entries(colors)) {
      scss += `"${name}": (\n`
      for (const [mode, value] of Object.entries(modes)) {
        scss += `"${mode}": ${value},\n`
      }
      scss += `),\n`
    }
    scss += ');\n'
  } else scss += '$colors: ();\n'

  return scss
}
function BuildTypography(typography: Theme['typography']): string {
  let scss: string = '\n\n// --- Typography ---\n'

  scss += '$defaultFontFamilies:'
  scss += typography?.defaultFontFamilies?.length ? typography.defaultFontFamilies.join(', ').replace(/"/g, '') : 'null'
  scss += ';\n'

  let fontPath = typography?.fontMainPath
  if (!fontPath?.startsWith('/')) fontPath = `/${fontPath}`

  scss += `$fontMainPath: ${fontPath ? `"${fontPath}"` : 'null'};\n`
  scss += `$fontFormat: ${typography?.fontFormat ? `"${typography.fontFormat}"` : 'null'};\n`

  scss += '$fontWeights: ('
  scss += typography?.fontWeights?.length ? typography.fontWeights.map((fW) => `"${fW}"`).join(', ') : ''
  scss += ');\n'

  scss += '$fontStyles: ('
  scss += typography?.fontStyles?.length ? typography.fontStyles.map((fS) => `"${fS}"`).join(', ') : ''
  scss += ');\n'

  scss += '$fontSizes: ('
  if (typography?.fontSizes?.length) {
    scss += '\n'
    for (const [name, value] of Object.entries(typography.fontSizes)) {
      scss += `"${name}": ${value},\n`
    }
    scss += '\n'
  }
  scss += ');\n'

  scss += '$textTruncate: ('
  scss += typography?.textTruncate?.length ? typography.textTruncate.join(', ') : ''
  scss += ');\n'

  scss += '$fonts: ('
  if (typography?.fonts) {
    scss += '\n'
    for (const [name, font] of Object.entries(typography.fonts)) {
      scss += `"${name}": (\n`
      if (font?.weights) scss += `"weights": (${font.weights.join(', ')}),\n`
      if (font?.styles) scss += `"styles": (${font.styles.join(', ')}),\n`
      if (font?.variants) {
        scss += `"variants": (\n`
        for (const [lang, variant] of Object.entries(font.variants)) {
          scss += `"${lang}": (\n`
          if (variant?.title) scss += `"title": ${variant.title.replace(/"/g, '')},\n`
          if (variant?.unicode) scss += `"unicode": "${variant.unicode}",\n`
          if (variant?.format) scss += `"format": "${variant.format}",\n`
          if (variant?.isLocal) scss += `"isLocal": ${variant.isLocal},\n`
          if (variant?.url) scss += `"url": "${variant.url}",\n`
          scss += '),\n'
        }
        scss += '),\n'
      }
      scss += '),\n'
    }
    scss += '\n'
  }
  scss += ');\n'

  return scss
}

function BuildSettings(settings: Theme['settings']): string {
  let scss = '\n\n// --- Settings ---\n'

  scss += `$axisDivisions: ${settings?.axisDivisions ?? 'null'};\n`

  scss += '$opacities: ('
  scss += settings?.opacities?.length ? settings.opacities.join(', ') : ''
  scss += ');\n'

  scss += '$blurValues: ('
  scss += settings?.blurValues?.length ? settings.blurValues.join(', ') : ''
  scss += ');\n'

  scss += '$insetValues: ('
  scss += settings?.insetValues?.length ? settings.insetValues.join(', ') : ''
  scss += ');\n'

  scss += '$bordersValue: ('
  scss += settings?.bordersValue?.length ? settings.bordersValue.join(', ') : ''
  scss += ');\n'

  scss += '$radiuses: ('
  scss += settings?.radiuses?.length ? settings.radiuses.join(', ') : ''
  scss += ');\n'

  scss += '$breakpoints: ('
  if (settings?.breakpoints) {
    scss += '\n'
    for (const [key, value] of Object.entries(settings.breakpoints)) {
      scss += `${key}: ${value},\n`
    }
    scss += '\n'
  }
  scss += ');\n'

  scss += '$wrappers: ('
  if (settings?.wrappers) {
    scss += '\n'
    for (const [key, wrapper] of Object.entries(settings.wrappers)) {
      scss += `${key}: ${wrapper.width} ${wrapper.padding ?? ''},\n`
    }
  }
  scss += ');\n'

  scss += '$guttersValues: ('
  if (settings?.guttersValues) {
    scss += '\n'
    for (const [key, value] of Object.entries(settings.guttersValues)) {
      scss += `${key}: ${value},\n`
    }
  }
  scss += ');\n'

  return scss
}
function BuildRoles(roles: Theme['roles']): string {
  let scss = '\n\n// --- Roles ---\n'

  if (roles)
    for (const [key, condition] of Object.entries(roles)) {
      scss += `$${key}: ${condition};\n`
    }

  return scss
}
function BuildGlass(glass: Theme['glass']): string {
  if (!glass) return ''

  let scss = '\n\n// --- Glass ---\n'

  scss += `$glassBlur: ${glass.blur ?? 'null'};\n`
  scss += `$glassBorderThickness: ${glass.borderThickness ?? 'null'};\n`
  scss += `$glassLightAngle: ${glass.lightAngle ?? 'null'};\n`

  scss += '$glassColor: (\n'
  scss += `  'light': ${glass?.glassColor?.light ?? '#ffffff'},\n`
  scss += `  'dark': ${glass?.glassColor?.dark ?? '#000000'},\n`
  scss += ');\n'

  scss += '$glassBorder1Color: (\n'
  scss += `  'light': ${glass?.border1Color?.light ?? '#e6e6e6'},\n`
  scss += `  'dark': ${glass?.border1Color?.dark ?? '#303030'},\n`
  scss += ');\n'

  scss += '$glassBorder2Color: (\n'
  scss += `  'light': ${glass?.border2Color?.light ?? '#e6e6e6'},\n`
  scss += `  'dark': ${glass?.border2Color?.dark ?? '#303030'},\n`
  scss += ');\n'

  return scss
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BuildScssVariables(theme: Theme, isLocalBuild: boolean = false): string {
  const { colors, roles, settings, typography, glass } = theme

  let scss: string = '// Generated by Beathers builder\n // Do not edit this file directly\n\n'
  scss += BuildColors(colors)
  scss += BuildTypography(typography)
  scss += BuildSettings(settings)
  scss += BuildRoles(roles)
  scss += BuildGlass(glass)

  return scss
}
