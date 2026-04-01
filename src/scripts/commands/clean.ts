/* eslint-disable no-console */

import fs from 'fs-extra'
import path from 'node:path'

const targets = ['public/css', 'css', 'scss', 'index.js', 'index.d.ts', 'index.d.ts.map', 'data', 'scripts']

async function clean() {
  const cwd = process.cwd()
  const cleaned: string[] = []

  for (const target of targets) {
    const targetPath = path.join(cwd, target)

    if (await fs.pathExists(targetPath)) {
      await fs.remove(targetPath)
      cleaned.push(target)
    }
  }

  if (cleaned.length > 0) {
    console.log('🧹 Cleaned the following files/folders:')
    cleaned.forEach((f) => console.log('  -', f))
  } else console.log('No files or folders needed cleaning.')
}

await clean()
