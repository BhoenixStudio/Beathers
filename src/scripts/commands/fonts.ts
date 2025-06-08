/* eslint-disable no-console */

import { findConfigFile, loadConfig, promptInput, promptSelection, promptUser, saveConfig } from '@commands'
import { importedFont, localFont } from '@data'
import { FontType } from '@types'

export async function AddFont(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const fontName = await promptInput('📝 Enter font name: ')
    if (!fontName) {
      console.error('❌ Font name is required.')
      return
    }

    const weightsInput = await promptInput('⚖️  Enter font weights (comma-separated, e.g., light,regular,bold): ')
    const weights = weightsInput ? weightsInput.split(',').map((w) => w.trim()) : ['regular']

    const stylesInput = await promptInput('🎨 Enter font styles (comma-separated, e.g., normal,italic): ')
    const styles = stylesInput ? stylesInput.split(',').map((s) => s.trim()) : ['normal']

    const isLocal = await promptUser('🔤 Is this a local font? (Y/N): ')

    const variantTitle = await promptInput('📛 Enter font variant title: ')
    const unicode = await promptInput('🔣 Enter unicode range (optional): ')
    let url = ''
    if (!isLocal) {
      url = await promptInput('🌐 Enter font URL (must start with http:// or https://): ')
      if (url && !/^https?:\/\//.test(url)) {
        console.error('❌ Invalid URL format. URL must start with http:// or https://')
        return
      }
    }

    const format = await promptSelection('📁 Choose font format:', ['woff2', 'woff'])

    const font: FontType = {
      weights: weights.filter((w) =>
        ['thin', 'extra-light', 'light', 'regular', 'medium', 'semibold', 'bold', 'extra-bold', 'black'].includes(w)
      ) as FontType['weights'],
      styles: styles.filter((s) => ['normal', 'italic', 'oblique'].includes(s)) as FontType['styles'],
      variants: {
        en: {
          title: variantTitle || fontName,
          ...(unicode && { unicode }),
          ...(format && { format }),
          ...(isLocal !== undefined && { isLocal }),
          ...(!isLocal && url && { url: url as `https://${string}` | `http://${string}` }),
        },
      },
    }

    const config = await loadConfig(configFile)

    config.typography ??= {}
    config.typography.fonts ??= {}

    config.typography.fonts[fontName] = font

    await saveConfig(configFile, config)
    console.log(`✅ Font "${fontName}" added successfully!`)
  } catch (error) {
    console.error('❌ Error adding font:', error)
  }
}

export async function RemoveFont(): Promise<void> {
  const args = process.argv.slice(2)
  const fontName = args[1]

  if (!fontName) {
    console.error('❌ Font name is required. Usage: npx beathers remove-font <fontName>')
    return
  }

  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const config = await loadConfig(configFile)

    if (!config.typography?.fonts?.[fontName]) {
      console.error(`❌ Font "${fontName}" not found in config.`)
      return
    }

    delete config.typography.fonts[fontName]

    await saveConfig(configFile, config)
    console.log(`✅ Font "${fontName}" removed successfully!`)
  } catch (error) {
    console.error('❌ Error removing font:', error)
  }
}

export async function ImportFont(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  const isLocal = await promptUser('🔤 Do you want a local font? (Y/N): ')
  const fontName = await promptInput('📝 Enter font name: ')

  if (!fontName) {
    console.error('❌ Font name is required.')
    return
  }

  try {
    const config = await loadConfig(configFile)

    config.typography ??= {}
    config.typography.fonts ??= {}

    config.typography.fonts[fontName] = isLocal ? localFont : importedFont

    await saveConfig(configFile, config)
    console.log(`✅ Sample font "${fontName}" imported successfully!`)
  } catch (error) {
    console.error('❌ Error importing font sample:', error)
  }
}
