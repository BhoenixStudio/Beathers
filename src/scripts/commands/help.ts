/* eslint-disable no-console */

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

export function Help() {
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
