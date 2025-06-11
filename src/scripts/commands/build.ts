/* eslint-disable no-console */

import { BuildScssVariables, DeepMerge, LoadUserConfigs, ReadDefaultValues } from '@helpers'
import { exec } from 'child_process'
import fs from 'fs-extra'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { promisify } from 'util'
import { promptInput } from '@commands'

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

async function BuildTheme(customOutputPath?: string) {
  try {
    const defaults = await defaultTheme()
    const userConfigs = await LoadUserConfigs()

    const theme = DeepMerge(defaults, userConfigs)
    const variablesString = BuildScssVariables(theme)

    await fs.writeFile(variablesPath, variablesString, { flag: 'w' })
    console.log(`✅ Theme built successfully at: ${variablesPath}`)

    console.log('')
    console.log('✅ Compile custom theme...')

    let buildCommand = 'npm run build'

    if (customOutputPath) {
      const userProjectRoot = process.cwd()
      const outputPath = path.join(userProjectRoot, customOutputPath)

      await fs.ensureDir(outputPath)

      buildCommand = `sass --style compressed --source-map --embed-sources --no-error-css src/scss/:${outputPath}/`
      console.log(`📁 Custom output path: ${outputPath}`)
    }

    const { stdout } = await execAsync(buildCommand)

    console.log('✅ build completed successfully')
    if (stdout) console.log('📝 Build output:', stdout.trim())
  } catch (error) {
    console.error('Error during custom theme build:', error)
    throw error
  }
}

export async function Build() {
  try {
    console.log('🎨 Building Beathers theme...')

    // Check if --local flag is provided
    const args = process.argv.slice(2)
    const hasLocalFlag = args.includes('--local')

    let customOutputPath: string | undefined

    if (hasLocalFlag) {
      console.log('🏠 Local build mode enabled')
      customOutputPath = await promptInput('📁 Enter the output path (e.g., public/css): ')

      if (!customOutputPath) {
        console.error('❌ Output path is required when using --local flag.')
        process.exit(1)
      }
    }

    await BuildTheme(customOutputPath)
  } catch (error) {
    console.error('❌ Error building theme:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2)

  if (args.includes('--local')) {
    console.log('🏠 Local build mode enabled')
    const { promptInput } = await import('@commands')
    const customOutputPath = await promptInput('📁 Enter the output path (e.g., public/css): ')

    if (!customOutputPath) {
      console.error('❌ Output path is required when using --local flag.')
      process.exit(1)
    }

    BuildTheme(customOutputPath).catch((error) => {
      console.error(error)
      process.exit(1)
    })
  } else
    BuildTheme().catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
