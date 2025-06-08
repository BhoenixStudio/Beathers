/* eslint-disable no-console */

import fs from 'fs-extra'
import path from 'path'

export function Version() {
  const packagePath = path.join(process.cwd(), 'package.json')
  try {
    const packageInfo = fs.readJsonSync(packagePath)
    console.log(`Beathers v${packageInfo.version}`)
  } catch {
    console.log('Beathers CLI')
  }
}
