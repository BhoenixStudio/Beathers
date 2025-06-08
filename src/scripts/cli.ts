#!/usr/bin/env node
/* eslint-disable no-console */

import { Commands } from '@commandsList'

async function main() {
  const args = process.argv.slice(2)
  const command = args[0] ?? 'build'
  const commands = Commands(args)

  const action = commands[command] ?? commands.default
  await action()
}

main()
