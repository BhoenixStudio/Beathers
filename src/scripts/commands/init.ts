/* eslint-disable no-console */

import { ReadDefaultValues } from '@helpers'
import { Theme } from '@types'
import fs from 'fs-extra'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { promptSelection, promptUser } from '@commands'

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
      'useMediaQueries',
      'useIcons',
      'useFontFamilies',
      'useFontSizes',
      'useFontShapes',
      'useTextAligns',
      'useTextTruncate',
      'useColors',
      'useColorsOpacities',
      'useColorsLightMode',
      'useColorsDarkMode',
      'useCurrentColors',
      'useRootColors',
      'useGrid',
      'useFlex',
      'useTransitions',
      'useWrappers',
      'useShadows',
      'useDisplays',
      'useOverflows',
      'useOpacities',
      'useBlur',
      'useObjectFits',
      'usePositions',
      'useInsets',
      'useSizes',
      'useGutters',
      'useBorders',
      'useTextBorders',
      'useRadius',
    ]
  )) as Theme
}

export async function Init() {
  const format = await promptSelection('\x1b[36m📁 Choose config format:\x1b[0m', ['json', 'js', 'ts'] as const)
  const formatMap = { json: 'beathers.configs.json', js: 'beathers.configs.js', ts: 'beathers.configs.ts' } as const

  const fileName = formatMap[format]
  const filePath = path.join(process.cwd(), fileName)

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

  let content = ''
  if (format === 'json') {
    const data = includeStarterValues ? await getDefaultValues() : emptyTemplate
    content = JSON.stringify(data, null, 2)
  } else if (format === 'js') {
    if (includeStarterValues) {
      const defaultValues = await getDefaultValues()
      content = `export default ${JSON.stringify(defaultValues, null, 2)}`
    } else content = `export default ${JSON.stringify(emptyTemplate, null, 2)}`
  } else if (format === 'ts') {
    const importLine = "import type { Theme } from 'beathers'\n\n"

    if (includeStarterValues) {
      const defaultValues = await getDefaultValues()
      content = `${importLine}export default ${JSON.stringify(defaultValues, null, 2)} satisfies Theme`
    } else content = `${importLine}export default ${JSON.stringify(emptyTemplate, null, 2)} satisfies Theme`
  }

  await fs.writeFile(filePath, content)
  const starterText = includeStarterValues ? ' with starter values' : ''
  console.log(`✅ Successfully created \x1b[32m${fileName}\x1b[0m${starterText}`)
}
