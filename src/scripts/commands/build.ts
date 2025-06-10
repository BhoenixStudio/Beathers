/* eslint-disable no-console */

import { BuildScssVariables, DeepMerge, LoadUserConfigs, ReadDefaultValues } from '@helpers'
import { exec } from 'child_process'
import fs from 'fs-extra'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { promisify } from 'util'

const execAsync = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../..')
const variablesPath = path.join(projectRoot, 'scss', '_variables.scss')

async function defaultTheme() {
  let values = null
  try {
    values = await ReadDefaultValues(
      [path.join(projectRoot, 'scss', 'settings', '_index.scss')],
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

async function BuildTheme() {
  try {
    const defaults = await defaultTheme()
    const userConfigs = await LoadUserConfigs()

    const theme = DeepMerge(defaults, userConfigs)
    const variablesString = BuildScssVariables(theme)

    await fs.writeFile(variablesPath, variablesString, { flag: 'w' })
    console.log(`✅ Theme built successfully at: ${variablesPath}`)

    await execAsync('npm run build:compressed')
  } catch (error) {
    console.error('Error during custom theme build:', error)
    throw error
  }
}

export async function Build() {
  try {
    console.log('🎨 Building Beathers theme...')
    await BuildTheme()
  } catch (error) {
    console.error('❌ Error building theme:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`)
  BuildTheme().catch((error) => {
    console.error(error)
    process.exit(1)
  })
