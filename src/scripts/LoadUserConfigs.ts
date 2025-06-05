import fs from 'fs-extra'
import path from 'path'
import { Theme } from './types.js'

const userConfigFiles = ['beathers.configs.js', 'beathers.configs.ts', 'beathers.configs.json']

function findConfigFile(basePath: string): string | null {
  for (const filename of userConfigFiles) {
    const fullPath = path.join(basePath, filename)
    if (fs.existsSync(fullPath)) return fullPath
  }
  return null
}

async function loadJsOrTsConfig(filePath: string): Promise<Theme> {
  try {
    const absolutePath = path.resolve(filePath)
    const module = await import(absolutePath)
    return module.default ?? module
  } catch (error) {
    throw new Error(`Failed to load config from ${filePath}: ${error}`)
  }
}

function loadJsonConfig(filePath: string): Theme {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    throw new Error(`Failed to parse JSON config from ${filePath}: ${error}`)
  }
}

export async function LoadUserConfigs(projectPath?: string): Promise<Theme | null> {
  const basePath = projectPath ?? process.cwd()

  const configFilePath = findConfigFile(basePath)
  if (!configFilePath) return null

  const extension = path.extname(configFilePath)

  if (extension === '.json') return loadJsonConfig(configFilePath)
  if (['.js', '.ts'].includes(extension)) return await loadJsOrTsConfig(configFilePath)

  throw new Error(`Unsupported config file format: ${extension}`)
}
