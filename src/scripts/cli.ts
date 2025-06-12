#!/usr/bin/env node

import { Commands } from '../scripts/commands/list.js'

async function main() {
  const args = process.argv.slice(2)

  let command = args[0] ?? 'build:pack'
  if (command.startsWith('--local')) command = 'build:pack'

  const commands = Commands(args)

  const action = commands[command] ?? commands.default
  await action()
}

main()
