/* eslint-disable no-console */

import fs from 'fs-extra'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export function Version() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const packagePath = path.join(__dirname, '../../..', 'package.json')

  try {
    const packageInfo = fs.readJsonSync(packagePath)
    console.log(`📦 \x1b[34mbeathers\x1b[0m v${packageInfo.version}`)
  } catch {
    console.log('📦 \x1b[34mbeathers\x1b[0m CLI')
  }
}
