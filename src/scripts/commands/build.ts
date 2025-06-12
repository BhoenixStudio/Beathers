/* eslint-disable no-console */

import { exec } from 'child_process'
import fs from 'fs-extra'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { promisify } from 'util'
import { promptInput } from '../commands/index.js'
import { BuildScssVariables, DeepMerge, LoadUserConfigs, ReadDefaultValues } from '../helpers/index.js'

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
    console.error('❌ Failed to read default theme configuration:', error instanceof Error ? error.message : error)
    process.exit(1)
  }

  return values
}

async function BuildTheme(customOutputPath?: string) {
  try {
    console.log('📦 Loading theme configuration...')
    const defaults = await defaultTheme()
    const userConfigs = await LoadUserConfigs()

    console.log('🔄 Building theme variables...')
    const theme = DeepMerge(defaults, userConfigs)
    const variablesString = BuildScssVariables(theme)

    await fs.writeFile(variablesPath, variablesString, { flag: 'w' })
    console.log(`✅ Theme variables generated: ${variablesPath}`)

    console.log('')
    console.log('🔨 Compiling SCSS to CSS...')

    let buildCommand = 'npm run build'

    if (customOutputPath) {
      const userProjectRoot = process.cwd()
      const outputPath = path.join(userProjectRoot, customOutputPath)

      await fs.ensureDir(outputPath)

      buildCommand = `sass --style compressed --source-map --embed-sources --no-error-css src/scss/:${outputPath}/`
      console.log(`📁 Output directory: ${outputPath}`)
    }

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

    // Check if --local flag is provided
    const args = process.argv.slice(2)
    const hasLocalFlag = args.includes('--local')

    let customOutputPath: string | undefined

    if (hasLocalFlag) {
      console.log('🏠 Local build mode enabled')
      customOutputPath = await promptInput('📁 Output path (e.g., public/css): ')

      if (!customOutputPath) {
        console.error('❌ Please provide an output path when using \x1b[33m--local\x1b[0m flag.')
        process.exit(1)
      }
    }

    await BuildTheme(customOutputPath)
  } catch (error) {
    console.error('❌ Failed to build theme:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2)

  if (args.includes('--local')) {
    console.log('🏠 Local build mode enabled')
    const { promptInput } = await import('../commands/index.js')
    const customOutputPath = await promptInput('📁 Output path (e.g., public/css): ')

    if (!customOutputPath) {
      console.error('❌ Please provide an output path when using \x1b[33m--local\x1b[0m flag.')
      process.exit(1)
    }

    BuildTheme(customOutputPath).catch((error) => {
      console.error('❌ Build failed:', error)
      process.exit(1)
    })
  } else
    BuildTheme().catch((error) => {
      console.error('❌ Build failed:', error)
      process.exit(1)
    })
}
