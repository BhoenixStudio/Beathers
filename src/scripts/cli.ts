#!/usr/bin/env node
/* eslint-disable no-console */

import {
  AddColor,
  AddFont,
  Build,
  Help,
  ImportColor,
  ImportColorPack,
  ImportFont,
  Init,
  RemoveColor,
  RemoveFont,
  Version,
} from '@commands'

async function main() {
  const args = process.argv.slice(2)
  const command = args[0] ?? 'build'

  const commands: Record<string, () => void | Promise<void>> = {
    '--help': () => Help(),
    '--v': () => Version(),
    '--version': () => Version(),
    init: async () => await Init(),
    build: async () => await Build(),
    'add-font': async () => await AddFont(),
    'remove-font': async () => await RemoveFont(),
    'import-font-sample': async () => await ImportFont(),
    'add-color': async () => await AddColor(),
    'remove-color': async () => await RemoveColor(),
    'import-color-pack': async () => await ImportColorPack(),
    'import-color': async () => await ImportColor(),

    default: () => {
      console.error(`❌ Unknown command: ${args[0]}`)
      console.log('\nUse "beathers --help" to see available commands.')
      process.exit(1)
    },
  }
  const action = commands[command] ?? commands.default

  await action()
}

main()
