/* eslint-disable no-console */

import { CommandKey } from '@commandsList'

const commands: { cmd?: Exclude<CommandKey, '--version'>; description?: string; divider?: boolean }[] = [
  { cmd: '--help', description: 'Show available commands' },
  { cmd: '-v', description: 'Show beathers version' },
  { divider: true },
  { cmd: 'init', description: 'Initialize beathers configuration file' },
  { cmd: 'build', description: 'Build theme from configuration file' },
  { divider: true },
  { cmd: 'add-font', description: 'Add a new font to the configuration file' },
  { cmd: 'remove-font', description: 'Remove a font from the configuration file' },
  { cmd: 'import-font-sample', description: 'Import sample font to configuration file' },
  { divider: true },
  { cmd: 'add-colors', description: 'Add a new colors to the configuration file' },
  { cmd: 'remove-color', description: 'Remove a color from configuration file' },
  { cmd: 'import-color-pack', description: 'Import a color pack to configuration file' },
  { cmd: 'import-color', description: 'Import a specific color to configuration file' },
]

export function Help() {
  console.log('\n🎨 Beathers CLI - Design System Builder\n')

  const table = [
    ['Command', 'Description', 'Examples'],
    ['-------', '-----------', '--------'],
  ]

  commands.forEach(({ cmd, description, divider }) => {
    const example = `npx beathers ${cmd}`
    if (cmd && description) table.push([cmd, description, example])
    if (cmd === '-v') table.push(['', '', 'npx beathers --version'])
    if (divider) table.push(['', '', ''])
  })

  const maxLengths = table[0].map((_, colIndex) => Math.max(...table.map((row) => row[colIndex].length)))

  table.forEach((row) => {
    const formattedRow = row.map((cell, colIndex) => cell.padEnd(maxLengths[colIndex])).join('  ')
    console.log(formattedRow)
  })

  console.log('\nFlags:')
  console.log("  --local               Build with user's custom output path (use with build command)")
  console.log('                        Example: npx beathers build --local')
  console.log()
}
