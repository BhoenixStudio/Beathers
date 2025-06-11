/* eslint-disable no-console */

import {
  AddColors,
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

const commands: Record<string, () => void | Promise<void>> = {
  '--help': () => Help(),
  '-v': () => Version(),
  '--version': () => Version(),
  init: async () => await Init(),
  build: async () => await Build(),
  '--local': async () => await Build(),
  'add-font': async () => await AddFont(),
  'remove-font': async () => await RemoveFont(),
  'import-font-sample': async () => await ImportFont(),
  'add-colors': async () => await AddColors(),
  'remove-color': async () => await RemoveColor(),
  'import-color-pack': async () => await ImportColorPack(),
  'import-color': async () => await ImportColor(),
} as const

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Commands(args: any) {
  const list: Record<string, () => void | Promise<void>> = {
    ...commands,
    default: () => {
      console.error(`❌ Unknown command: ${args[0]}`)
      console.log('\nUse "beathers --help" to see available commands.')
      process.exit(1)
    },
  }

  return list
}

export type CommandKey =
  | '--help'
  | '-v'
  | '--version'
  | 'init'
  | 'build'
  | 'add-font'
  | 'remove-font'
  | 'import-font-sample'
  | 'add-colors'
  | 'remove-color'
  | 'import-color-pack'
  | 'import-color'
