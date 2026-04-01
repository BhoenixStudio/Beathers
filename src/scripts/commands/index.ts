/* eslint-disable no-console */

import fs from 'fs-extra'
import path from 'node:path'
import { Theme } from '../types.js'

// Functions
export async function promptUser(question: string): Promise<boolean> {
  const readline = await import('node:readline')
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.toLowerCase().startsWith('y'))
    })
  })
}

export async function promptInput(question: string): Promise<string> {
  const readline = await import('node:readline')
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

export async function promptSelection<T extends string>(question: string, options: T[]): Promise<T> {
  const readline = await import('node:readline')

  return new Promise((resolve) => {
    const ask = () => {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
      console.log(question)
      options.forEach((option, index) => console.log(`  ${index + 1}. ${option}`))
      rl.question('Enter your choice (number): ', (answer) => {
        rl.close()
        const choice = Number.parseInt(answer.trim()) - 1
        if (choice >= 0 && choice < options.length) resolve(options[choice])
        else {
          console.log('❌ Invalid choice. Please try again.')
          ask()
        }
      })
    }
    ask()
  })
}

export async function findConfigFile(): Promise<string | null> {
  const userConfigFiles = ['beathers.configs.ts', 'beathers.configs.js', 'beathers.configs.json']

  for (const filename of userConfigFiles) {
    const fullPath = path.join(process.cwd(), filename)
    if (await fs.pathExists(fullPath)) return fullPath
  }
  return null
}

export async function loadConfig(filePath: string): Promise<Theme> {
  const extension = path.extname(filePath)

  if (extension === '.json') {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } else if (['.js', '.ts'].includes(extension)) {
    let content = await fs.readFile(filePath, 'utf-8')

    content = content.replaceAll(/import.*from.*['"].*['"];?\n/g, '')
    content = content.replaceAll(/export default\s+/, '')
    content = content.replaceAll(/satisfies Theme\s*$/, '')

    try {
      const config = eval(`(${content})`)
      return config
    } catch (error) {
      throw new Error(`Failed to parse config file: ${error}`)
    }
  }

  throw new Error(`Unsupported config file format: ${extension}`)
}

export async function saveConfig(filePath: string, config: Theme): Promise<void> {
  const extension = path.extname(filePath)

  if (extension === '.json') await fs.writeFile(filePath, JSON.stringify(config, null, 2))
  else if (extension === '.js') {
    const content = `export default ${JSON.stringify(config, null, 2)}`
    await fs.writeFile(filePath, content)
  } else if (extension === '.ts') {
    const content = `import type { Theme } from 'beathers'\n\nexport default ${JSON.stringify(config, null, 2)} satisfies Theme`
    await fs.writeFile(filePath, content)
  }
}

// Commands
export * from './build.js'
export * from './colors.js'
export * from './fonts.js'
export * from './help.js'
export * from './init.js'
export * from './version.js'
