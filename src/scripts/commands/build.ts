/* eslint-disable no-console */

import fs from 'fs-extra'
import { exec } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { promptInput } from '../commands/index.js'
import { BuildScssVariables, DeepMerge, LoadUserConfigs, ReadDefaultValues } from '../helpers/index.js'

const execAsync = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../..')

// Detect if running as installed package vs development
const isInstalledPackage = projectRoot.includes('node_modules')
let packageRoot: string
let variablesPath: string

if (isInstalledPackage) {
  const userProjectRoot = process.cwd()
  packageRoot = path.join(userProjectRoot, 'node_modules', 'beathers')
  variablesPath = path.join(packageRoot, 'scss', '_variables.scss')
} else {
  packageRoot = projectRoot
  // Write variables to src location for development builds
  variablesPath = path.join(projectRoot, 'scss', '_variables.scss')
}

async function defaultTheme() {
  let values = null
  try {
    values = await ReadDefaultValues(
      [path.join(projectRoot, 'scss', 'settings', '_index.scss')],
      [
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
        'useButton',
      ]
    )
  } catch (error) {
    console.error('❌ Failed to read default theme configuration:', error instanceof Error ? error.message : error)
    process.exit(1)
  }

  return values
}

async function BuildTheme(customOutputPath: string) {
  try {
    console.log('📦 Loading theme configuration...')
    const defaults = await defaultTheme()
    const userConfigs = await LoadUserConfigs()

    console.log('🔄 Building theme variables...')
    const theme = DeepMerge(defaults, userConfigs)
    const variablesString = BuildScssVariables(theme)

    await fs.writeFile(variablesPath, variablesString, { flag: 'w' })
    console.log(`✅ Theme variables generated`)

    console.log('')
    console.log('🔨 Compiling SCSS to CSS...')

    const userProjectRoot = process.cwd()
    const scssSourcePath = path.join(packageRoot, 'scss')

    const outputPath = path.join(userProjectRoot, customOutputPath)
    console.log(`📁 Output directory: \x1b[36m${outputPath}\x1b[0m`)

    await fs.ensureDir(outputPath)

    const buildCommand = `sass --style compressed --source-map --embed-sources --no-error-css "${scssSourcePath}":"${outputPath}"`

    const { stdout } = await execAsync(buildCommand)

    console.log('✅ Theme compilation completed successfully!')
    if (stdout) console.log('📋 Build details:', stdout.trim())
  } catch (error) {
    console.error('❌ Failed to build theme:', error)
    throw error
  }
}

export async function Build() {
  try {
    console.log('🎨 Building \x1b[36mBeathers\x1b[0m theme...')

    const defaultOutputPath = 'public/css'
    let outputPath = defaultOutputPath

    try {
      // Try to load user config to get outputPath
      const userConfigs = await LoadUserConfigs()
      if (userConfigs?.outputPath) {
        outputPath = userConfigs.outputPath
        console.log(`📁 Using output path from config: \x1b[36m${outputPath}\x1b[0m`)
      } else {
        // No config file or no outputPath in config, ask user
        console.log('🏠 Where would you like to save the compiled CSS files?')
        console.log(`💡 Default: \x1b[36m${defaultOutputPath}\x1b[0m (press Enter to use default)`)

        const customOutputPath = await promptInput('📁 Output path: ')
        outputPath = customOutputPath.trim() || defaultOutputPath
      }
    } catch {
      // No config file exists, ask user
      console.log('🏠 Where would you like to save the compiled CSS files?')
      console.log(`💡 Default: \x1b[36m${defaultOutputPath}\x1b[0m (press Enter to use default)`)

      const customOutputPath = await promptInput('📁 Output path: ')
      outputPath = customOutputPath.trim() || defaultOutputPath
    }

    await BuildTheme(outputPath)
  } catch (error) {
    console.error('❌ Failed to build theme:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  Build().catch((error) => {
    console.error('❌ Build failed:', error)
    process.exit(1)
  })
}
