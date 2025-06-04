/* eslint-disable no-console */
import fs from 'fs-extra'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { BuildScssVariables } from './BuildScssVariables.js'
import { CallNewVariables } from './CallNewVariables.js'
import { LoadUserConfigs } from './LoadUserConfigs.js'
import { DeepMerge } from './Merge.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../..')
const variablesPath = path.join(projectRoot, 'src', 'scss', '_variables.scss')

export async function BuildTheme() {
  try {
    const userConfigs = await LoadUserConfigs()

    const theme = DeepMerge({}, userConfigs)
    const variablesString = BuildScssVariables(theme)

    await fs.writeFile(variablesPath, variablesString, { flag: 'w' })
    await CallNewVariables(projectRoot)
  } catch (error) {
    console.error('Error during custom theme build:', error)
    throw error
  }
}

if (import.meta.url === `file://${process.argv[1]}`)
  BuildTheme().catch((error) => {
    console.error(error)
    process.exit(1)
  })
