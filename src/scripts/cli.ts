#!/usr/bin/env node

import { Commands } from '@commandsList'

async function main() {
  const args = process.argv.slice(2)
  const command = args[0] ?? 'build'
  const commands = Commands(args)

  const action = commands[command] ?? commands.default
  await action()
}

main()
