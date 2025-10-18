/* eslint-disable no-console */

import fs from 'fs-extra'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { promptSelection, promptUser } from '../commands/index.js'
import { ReadDefaultValues } from '../helpers/index.js'
import { Theme } from '../types.js'

async function getDefaultValues(): Promise<Theme> {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const projectRoot = path.resolve(__dirname, '..', '..')

  return (await ReadDefaultValues(
    [
      path.join(projectRoot, 'scss', 'settings', '_defaults.scss'),
      path.join(projectRoot, 'scss', 'settings', '_configs.scss'),
      path.join(projectRoot, 'scss', 'settings', '_index.scss'),
    ],
    [
      'colors',
      'fonts',
      'fontMainPath',
      'fontFormat',
      'fontWeights',
      'fontStyles',
      'textTruncate',
      'defaultFontFamilies',
      'fontSizes',
      'axisDivisions',
      'breakpoints',
      'wrappers',
      'opacities',
      'blurValues',
      'insetValues',
      'guttersValues',
      'bordersValue',
      'radiuses',
      'glassBlur',
      'glassColor',
      'glassBorderThickness',
      'glassBorder1Color',
      'glassBorder2Color',
      'glassLightAngle',
      'loaderColorMain',
      'loaderColorSecond',
      'loaderDuration',
      'useFontFamilies',
      'useFontFamiliesMediaQueries',
      'useFontSizes',
      'useFontSizesMediaQueries',
      'useFontShapes',
      'useFontShapesMediaQueries',
      'useTextAligns',
      'useTextAlignsMediaQueries',
      'useTextTruncate',
      'useTextTruncateMediaQueries',
      'useColors',
      'useColorsOpacities',
      'useColorsLightMode',
      'useColorsDarkMode',
      'useCurrentColors',
      'useRootColors',
      'useGrid',
      'useFlex',
      'useGridMediaQueries',
      'useWrappers',
      'useShadows',
      'useShadowsMediaQueries',
      'useDisplays',
      'useDisplaysMediaQueries',
      'useOverflows',
      'useOverflowsMediaQueries',
      'useOpacities',
      'useOpacitiesMediaQueries',
      'useBlur',
      'useBlurMediaQueries',
      'useObjectFits',
      'useObjectFitsMediaQueries',
      'usePositions',
      'usePositionsMediaQueries',
      'useInsets',
      'useInsetsMediaQueries',
      'useSizes',
      'useSizesMediaQueries',
      'useGutters',
      'useGuttersMediaQueries',
      'useBorders',
      'useBordersMediaQueries',
      'useTextBorders',
      'useTextBordersMediaQueries',
      'useRadius',
      'useRadiusMediaQueries',
      'useGlass',
      'useLoader',
      'useDialog',
    ]
  )) as Theme
}

export async function Init() {
  const format = await promptSelection('\x1b[36m📁 Choose config format:\x1b[0m', ['json', 'js', 'ts'] as const)
  const formatMap = { json: 'beathers.configs.json', js: 'beathers.configs.js', ts: 'beathers.configs.ts' } as const

  const fileName = formatMap[format]
  const filePath = path.join(process.cwd(), fileName)
  const outputPath = 'public/css'

  if (await fs.pathExists(filePath)) {
    const shouldOverride = await promptUser(
      `\x1b[33m⚠️  ${fileName} already exists. Do you want to override it?\x1b[0m\n\x1b[32m[Y]\x1b[0m Yes \x1b[31m[N]\x1b[0m No: `
    )

    if (!shouldOverride) {
      console.log('❌ Operation canceled.')
      return
    }
  }

  const includeStarterValues = await promptUser(
    '\x1b[36m📝 Would you like to include starter configuration values?\x1b[0m\n\x1b[32m[Y]\x1b[0m Yes \x1b[31m[N]\x1b[0m No: '
  )
  const defaultValues = await getDefaultValues()
  const emptyTemplate = {
    colors: {},
    typography: {
      defaultFontFamilies: [],
      fontMainPath: '',
      fontFormat: '',
      fontWeights: [],
      fontStyles: [],
      fontSizes: {},
      textTruncate: 0,
      fonts: {},
    },
    settings: {
      axisDivisions: 0,
      opacities: [],
      blurValues: [],
      insetValues: [],
      bordersValue: 0,
      radiuses: [],
      breakpoints: {},
      wrappers: {},
      guttersValues: {},
    },
    roles: {},
  }

  const data = includeStarterValues ? defaultValues : emptyTemplate
  const finalData = { ...data, outputPath }
  const content = JSON.stringify(finalData, null, 2)

  let pageContent = content
  if (format === 'js') pageContent = `export default ${content}`
  else if (format === 'ts')
    pageContent = `import type { Theme } from 'beathers'\n\nexport default ${content} satisfies Theme`

  await fs.writeFile(filePath, pageContent)
  const starterText = includeStarterValues ? ' with starter values' : ''
  console.log(`✅ Successfully created \x1b[32m${fileName}\x1b[0m${starterText}`)
}
