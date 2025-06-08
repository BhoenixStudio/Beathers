#!/usr/bin/env node
/* eslint-disable no-console */

import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { BuildTheme } from './BuildTheme.js'
import { ReadDefaultValues } from './helpers/ReadDefaultValues.js'
import { Theme, FontType } from './types.js'
import { colorsList } from '../data/colors.js'
import { localFont, importedFont } from '../data/font.js'

const commands = {
  build: { description: 'Build theme from configuration files', examples: ['beathers build'] },
  init: { description: 'Initialize beathers configuration file', examples: ['beathers init'] },
  'import-font-sample': {
    description: 'Import sample font to user config file',
    examples: ['beathers import-font-sample'],
  },
  'add-font': { description: 'Add a new font to the config file', examples: ['beathers add-font'] },
  'remove-font': { description: 'Remove a font from the config file', examples: ['beathers remove-font <fontName>'] },
  'import-color-pack': {
    description: 'Import a color pack to user config file',
    examples: ['beathers import-color-pack'],
  },
  'import-color': {
    description: 'Import a specific color to user config file',
    examples: ['beathers import-color <colorName>'],
  },
  'add-color': { description: 'Add a new color to the config file', examples: ['beathers add-color'] },
  'remove-color': {
    description: 'Remove a color from user config file',
    examples: ['beathers remove-color <colorName>'],
  },
  version: { description: 'Show version information', examples: ['beathers -v', 'beathers --version'] },
  help: { description: 'Show help information', examples: ['beathers --help'] },
}

function showHelp() {
  console.log('\n🎨 Beathers CLI - Design System Builder\n')

  const table = [
    ['Command', 'Description', 'Examples'],
    ['-------', '-----------', '--------'],
  ]

  Object.entries(commands).forEach(([cmd, info]) => {
    table.push([cmd, info.description, info.examples[0]])
    if (info.examples.length > 1) {
      info.examples.slice(1).forEach((example) => {
        table.push(['', '', example])
      })
    }
  })

  const maxLengths = table[0].map((_, colIndex) => Math.max(...table.map((row) => row[colIndex].length)))

  table.forEach((row) => {
    const formattedRow = row.map((cell, colIndex) => cell.padEnd(maxLengths[colIndex])).join('  ')
    console.log(formattedRow)
  })

  console.log('\nFlags:')
  console.log('  --help                Show this help message')
  console.log('  -v, --version         Show version information')
  console.log()
}

function showVersion() {
  const packagePath = path.join(process.cwd(), 'package.json')
  try {
    const packageInfo = fs.readJsonSync(packagePath)
    console.log(`Beathers v${packageInfo.version}`)
  } catch {
    console.log('Beathers CLI')
  }
}

async function getDefaultValues(): Promise<Theme> {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const projectRoot = path.resolve(__dirname, '..', '..')

  return (await ReadDefaultValues(
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
  )) as Theme
}

async function promptUser(question: string): Promise<boolean> {
  const readline = await import('readline')
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.toLowerCase().startsWith('y'))
    })
  })
}

// Helper functions for user input
async function promptInput(question: string): Promise<string> {
  const readline = await import('readline')
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function promptSelection<T extends string>(question: string, options: T[]): Promise<T> {
  const readline = await import('readline')
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  console.log(question)
  options.forEach((option, index) => {
    console.log(`  ${index + 1}. ${option}`)
  })

  return new Promise((resolve) => {
    rl.question('Enter your choice (number): ', (answer) => {
      rl.close()
      const choice = parseInt(answer.trim()) - 1
      if (choice >= 0 && choice < options.length) {
        resolve(options[choice])
      } else {
        console.log('❌ Invalid choice. Using first option as default.')
        resolve(options[0])
      }
    })
  })
}

// Config file management
async function findConfigFile(): Promise<string | null> {
  const userConfigFiles = ['beathers.configs.ts', 'beathers.configs.js', 'beathers.configs.json']

  for (const filename of userConfigFiles) {
    const fullPath = path.join(process.cwd(), filename)
    if (await fs.pathExists(fullPath)) {
      return fullPath
    }
  }
  return null
}

async function loadConfig(filePath: string): Promise<Theme> {
  const extension = path.extname(filePath)

  if (extension === '.json') {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } else if (['.js', '.ts'].includes(extension)) {
    // For JS/TS files, we need to read and parse manually since dynamic import won't work for modifications
    let content = await fs.readFile(filePath, 'utf-8')

    // Remove import statements and export default
    content = content.replace(/import.*from.*['"].*['"];?\n/g, '')
    content = content.replace(/export default\s+/, '')
    content = content.replace(/satisfies Theme\s*$/, '')

    // Use eval to parse the object (safe since we control the content)
    try {
      const config = eval(`(${content})`)
      return config
    } catch (error) {
      throw new Error(`Failed to parse config file: ${error}`)
    }
  }

  throw new Error(`Unsupported config file format: ${extension}`)
}

async function saveConfig(filePath: string, config: Theme): Promise<void> {
  const extension = path.extname(filePath)

  if (extension === '.json') {
    await fs.writeFile(filePath, JSON.stringify(config, null, 2))
  } else if (extension === '.js') {
    const content = `export default ${JSON.stringify(config, null, 2)}`
    await fs.writeFile(filePath, content)
  } else if (extension === '.ts') {
    const content = `import type { Theme } from 'beathers'\n\nexport default ${JSON.stringify(config, null, 2)} satisfies Theme`
    await fs.writeFile(filePath, content)
  }
}

// Font commands
async function importFontSampleCommand(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  const isLocal = await promptUser('🔤 Do you want a local font? (Y/N): ')
  const fontName = await promptInput('📝 Enter font name: ')

  if (!fontName) {
    console.error('❌ Font name is required.')
    return
  }

  try {
    const config = await loadConfig(configFile)

    config.typography ??= {}
    config.typography.fonts ??= {}

    config.typography.fonts[fontName] = isLocal ? localFont : importedFont

    await saveConfig(configFile, config)
    console.log(`✅ Sample font "${fontName}" imported successfully!`)
  } catch (error) {
    console.error('❌ Error importing font sample:', error)
  }
}

async function addFontCommand(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const fontName = await promptInput('📝 Enter font name: ')
    if (!fontName) {
      console.error('❌ Font name is required.')
      return
    }

    const weightsInput = await promptInput('⚖️  Enter font weights (comma-separated, e.g., light,regular,bold): ')
    const weights = weightsInput ? weightsInput.split(',').map((w) => w.trim()) : ['regular']

    const stylesInput = await promptInput('🎨 Enter font styles (comma-separated, e.g., normal,italic): ')
    const styles = stylesInput ? stylesInput.split(',').map((s) => s.trim()) : ['normal']

    const isLocal = await promptUser('🔤 Is this a local font? (Y/N): ')

    const variantTitle = await promptInput('📛 Enter font variant title: ')
    const unicode = await promptInput('🔣 Enter unicode range (optional): ')
    let url = ''
    if (!isLocal) {
      url = await promptInput('🌐 Enter font URL (must start with http:// or https://): ')
      if (url && !/^https?:\/\//.test(url)) {
        console.error('❌ Invalid URL format. URL must start with http:// or https://')
        return
      }
    }

    const format = await promptSelection('📁 Choose font format:', ['woff2', 'woff'])

    const font: FontType = {
      weights: weights.filter((w) =>
        ['thin', 'extra-light', 'light', 'regular', 'medium', 'semibold', 'bold', 'extra-bold', 'black'].includes(w)
      ) as FontType['weights'],
      styles: styles.filter((s) => ['normal', 'italic', 'oblique'].includes(s)) as FontType['styles'],
      variants: {
        en: {
          title: variantTitle || fontName,
          ...(unicode && { unicode }),
          ...(format && { format }),
          ...(isLocal !== undefined && { isLocal }),
          ...(!isLocal && url && { url: url as `https://${string}` | `http://${string}` }),
        },
      },
    }

    const config = await loadConfig(configFile)

    config.typography ??= {}
    config.typography.fonts ??= {}

    config.typography.fonts[fontName] = font

    await saveConfig(configFile, config)
    console.log(`✅ Font "${fontName}" added successfully!`)
  } catch (error) {
    console.error('❌ Error adding font:', error)
  }
}

async function removeFontCommand(): Promise<void> {
  const args = process.argv.slice(2)
  const fontName = args[1]

  if (!fontName) {
    console.error('❌ Font name is required. Usage: beathers remove-font <fontName>')
    return
  }

  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const config = await loadConfig(configFile)

    if (!config.typography?.fonts?.[fontName]) {
      console.error(`❌ Font "${fontName}" not found in config.`)
      return
    }

    delete config.typography.fonts[fontName]

    await saveConfig(configFile, config)
    console.log(`✅ Font "${fontName}" removed successfully!`)
  } catch (error) {
    console.error('❌ Error removing font:', error)
  }
}

// Color commands
async function importColorPackCommand(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const packName = await promptSelection('🎨 Choose a color pack:', Object.keys(colorsList))
    const selectedPack = colorsList[packName as keyof typeof colorsList]

    const config = await loadConfig(configFile)

    config.colors ??= {}

    Object.assign(config.colors, selectedPack)

    await saveConfig(configFile, config)
    console.log(`✅ Color pack "${packName}" imported successfully!`)
  } catch (error) {
    console.error('❌ Error importing color pack:', error)
  }
}

async function importColorCommand(): Promise<void> {
  const args = process.argv.slice(2)
  const colorName = args[1]

  if (!colorName) {
    console.error('❌ Color name is required. Usage: beathers import-color <colorName>')
    return
  }

  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    let foundColor = null
    let foundInPack = ''

    // Search for color in all packs
    for (const [packName, pack] of Object.entries(colorsList)) {
      if (pack[colorName]) {
        foundColor = pack[colorName]
        foundInPack = packName
        break
      }
    }

    if (!foundColor) {
      console.error(`❌ Color "${colorName}" not found in any color pack.`)
      console.log('Available colors:')
      Object.entries(colorsList).forEach(([packName, pack]) => {
        console.log(`  ${packName}: ${Object.keys(pack).join(', ')}`)
      })
      return
    }
    const config = await loadConfig(configFile)

    config.colors ??= {}

    config.colors[colorName] = foundColor

    await saveConfig(configFile, config)
    console.log(`✅ Color "${colorName}" from "${foundInPack}" imported successfully!`)
  } catch (error) {
    console.error('❌ Error importing color:', error)
  }
}

async function addColorCommand(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const colorName = await promptInput('🎨 Enter color name: ')
    if (!colorName) {
      console.error('❌ Color name is required.')
      return
    }

    const lightColor = await promptInput('☀️ Enter light mode color (hex, e.g., #ffffff): ')
    const darkColor = await promptInput('🌙 Enter dark mode color (hex, e.g., #000000): ')

    if (!lightColor && !darkColor) {
      console.error('❌ At least one color (light or dark) is required.')
      return
    }

    // Validate hex colors
    const hexPattern = /^#[0-9A-Fa-f]{6}$/
    if (lightColor && !hexPattern.test(lightColor)) {
      console.error('❌ Invalid light color format. Use hex format like #ffffff')
      return
    }
    if (darkColor && !hexPattern.test(darkColor)) {
      console.error('❌ Invalid dark color format. Use hex format like #000000')
      return
    }
    const config = await loadConfig(configFile)

    config.colors ??= {}

    config.colors[colorName] = {
      ...(lightColor && { light: lightColor as `#${string}` }),
      ...(darkColor && { dark: darkColor as `#${string}` }),
    }

    await saveConfig(configFile, config)
    console.log(`✅ Color "${colorName}" added successfully!`)
  } catch (error) {
    console.error('❌ Error adding color:', error)
  }
}

async function removeColorCommand(): Promise<void> {
  const args = process.argv.slice(2)
  const colorName = args[1]

  if (!colorName) {
    console.error('❌ Color name is required. Usage: beathers remove-color <colorName>')
    return
  }

  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const config = await loadConfig(configFile)

    if (!config.colors?.[colorName]) {
      console.error(`❌ Color "${colorName}" not found in config.`)
      return
    }

    delete config.colors[colorName]

    await saveConfig(configFile, config)
    console.log(`✅ Color "${colorName}" removed successfully!`)
  } catch (error) {
    console.error('❌ Error removing color:', error)
  }
}

async function initCommand() {
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

async function buildCommand() {
  try {
    console.log('🎨 Building Beathers theme...')
    await BuildTheme()
    console.log('✅ Theme built successfully!')
  } catch (error) {
    console.error('❌ Error building theme:', error)
    process.exit(1)
  }
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args[0] === 'build') {
    await buildCommand()
    return
  }

  const command = args[0]

  if (command === 'init') await initCommand()
  else if (command === 'import-font-sample') await importFontSampleCommand()
  else if (command === 'add-font') await addFontCommand()
  else if (command === 'remove-font') await removeFontCommand()
  else if (command === 'import-color-pack') await importColorPackCommand()
  else if (command === 'import-color') await importColorCommand()
  else if (command === 'add-color') await addColorCommand()
  else if (command === 'remove-color') await removeColorCommand()
  else if (command === '--help') showHelp()
  else if (['-v', '--version'].includes(command)) showVersion()
  else {
    console.error(`❌ Unknown command: ${command}`)
    console.log('\nUse "beathers --help" to see available commands.')
    process.exit(1)
  }
}

main()
