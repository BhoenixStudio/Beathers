/* eslint-disable no-console */
import fs from 'fs-extra'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { BuildScssVariables } from './BuildScssVariables.js'
import { LoadUserConfigs } from './LoadUserConfigs.js'
import { DeepMerge } from './Merge.js'
import { ReadDefaultValues } from './ReadDefaultValues.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../..')
const variablesPath = path.join(projectRoot, 'src', 'scss', '_variables.scss')

async function defaultTheme() {
  let values = null
  try {
    values = await ReadDefaultValues(
      [path.join(projectRoot, 'src', 'scss', 'settings', '_index.scss')],
      [
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
    console.error('❌ buildCustomTheme failed:', error instanceof Error ? error.message : error)
    process.exit(1)
  }

  return values
}

export async function BuildTheme() {
  try {
    const defaults = await defaultTheme()
    const userConfigs = await LoadUserConfigs()

    const theme = DeepMerge(defaults, userConfigs)
    const variablesString = BuildScssVariables(theme)

    await fs.writeFile(variablesPath, variablesString, { flag: 'w' })
  } catch (error) {
    console.error('Error during custom theme build:', error)
    throw error
  }
}

if (import.meta.url === `file://${process.argv[1]}`)
  BuildTheme().catch((error) => {
    console.error(error)
    process.exit(1)
  })
