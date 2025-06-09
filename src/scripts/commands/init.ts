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
  const format = await promptSelection('📁 Choose config format:', ['json', 'js', 'ts'] as const)
  const formatMap = { json: 'beathers.configs.json', js: 'beathers.configs.js', ts: 'beathers.configs.ts' } as const

  const fileName = formatMap[format]
  const filePath = path.join(process.cwd(), fileName)

  if (await fs.pathExists(filePath)) {
    const shouldOverride = await promptUser(`⚠️  ${fileName} already exists. Do you want to override it? (Y/N): `)

    if (!shouldOverride) {
      console.log('❌ Operation aborted.')
      return
    }
  }

  const includeStarterValues = await promptUser('📝 Would you like to include starter configuration values? (Y/N): ')

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
  const starterText = includeStarterValues ? ' with starter configuration values' : ''
  console.log(`✅ Created ${fileName}${starterText}`)
}
