#!/usr/bin/env node
/* eslint-disable no-console */

import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { BuildTheme } from './BuildTheme.js'
import { ReadDefaultValues } from './ReadDefaultValues.js'
import { Theme } from './types.js'

const commands = {
  build: { description: 'Build theme from configuration files', examples: ['beathers build'] },
  init: { description: 'Initialize beathers configuration file', examples: ['beathers init'] },
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

async function promptFormat(): Promise<'json' | 'js' | 'ts'> {
  const readline = await import('readline')
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  return new Promise((resolve) => {
    rl.question('📁 Choose file format (json/js/ts): json', (answer) => {
      rl.close()
      const format = answer.toLowerCase().trim()
      if (format === 'js' || format === 'ts') resolve(format)
      else resolve('json')
    })
  })
}

async function initCommand() {
  const format = await promptFormat()
  const formatMap = { json: 'beathers.configs.json', js: 'beathers.configs.js', ts: 'beathers.configs.ts' }

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
  else if (command === '--help') showHelp()
  else if (['-v', '--version'].includes(command)) showVersion()
  else {
    console.error(`❌ Unknown command: ${command}`)
    console.log('\nUse "beathers --help" to see available commands.')
    process.exit(1)
  }
}

main()
