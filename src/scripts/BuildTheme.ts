import fs from 'fs-extra'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { LoadUserConfigs } from './LoadUserConfigs.js'
import { DeepMerge } from './Merge.js'
import { ReadDefaultValues } from './ReadDefaultValues.js'
import { BuildScssVariables } from './BuildScssVariables.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../..')
const variablesPath = path.join(projectRoot, 'src', 'scss', '_variables.scss')

async function defaultTheme() {
  let values = null
  try {
    values = await ReadDefaultValues(
      [
        path.join(projectRoot, 'src', 'scss', 'settings', '_defaults.scss'),
        path.join(projectRoot, 'src', 'scss', 'settings', '_configs.scss'),
        path.join(projectRoot, 'src', 'scss', 'settings', '_index.scss'),
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
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ buildCustomTheme failed:', error instanceof Error ? error.message : error)
    process.exit(1)
  }

  return values
}

async function buildCustomTheme() {
  try {
    const defaults = await defaultTheme()
    const userConfigs = await LoadUserConfigs()

    const theme = DeepMerge(defaults, userConfigs)
    const variablesString = BuildScssVariables(theme)

    await fs.writeFile(variablesPath, variablesString, { flag: 'w' })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error during custom theme build:', error)
    process.exit(1)
  }
}

buildCustomTheme()
