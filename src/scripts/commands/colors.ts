/* eslint-disable no-console */

import { findConfigFile, loadConfig, promptInput, promptSelection, saveConfig } from '@commands'
import { colorsList } from '@data'

export async function AddColor(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const colorName = await promptInput('🎨 Enter color name: ')
    if (!colorName) {
      console.error('❌ Color name is required.')
      return
    }

    const lightColor = await promptInput('☀️ Enter light mode color (hex, e.g., #ffffff): ')
    const darkColor = await promptInput('🌙 Enter dark mode color (hex, e.g., #000000): ')

    if (!lightColor && !darkColor) {
      console.error('❌ At least one color (light or dark) is required.')
      return
    }

    // Validate hex colors
    const hexPattern = /^#[0-9A-Fa-f]{6}$/
    if (lightColor && !hexPattern.test(lightColor)) {
      console.error('❌ Invalid light color format. Use hex format like #ffffff')
      return
    }
    if (darkColor && !hexPattern.test(darkColor)) {
      console.error('❌ Invalid dark color format. Use hex format like #000000')
      return
    }
    const config = await loadConfig(configFile)

    config.colors ??= {}

    config.colors[colorName] = {
      ...(lightColor && { light: lightColor as `#${string}` }),
      ...(darkColor && { dark: darkColor as `#${string}` }),
    }

    await saveConfig(configFile, config)
    console.log(`✅ Color "${colorName}" added successfully!`)
  } catch (error) {
    console.error('❌ Error adding color:', error)
  }
}

export async function RemoveColor(): Promise<void> {
  const args = process.argv.slice(2)
  const colorName = args[1]

  if (!colorName) {
    console.error('❌ Color name is required. Usage: beathers remove-color <colorName>')
    return
  }

  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const config = await loadConfig(configFile)

    if (!config.colors?.[colorName]) {
      console.error(`❌ Color "${colorName}" not found in config.`)
      return
    }

    delete config.colors[colorName]

    await saveConfig(configFile, config)
    console.log(`✅ Color "${colorName}" removed successfully!`)
  } catch (error) {
    console.error('❌ Error removing color:', error)
  }
}

export async function ImportColorPack(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const packName = await promptSelection('🎨 Choose a color pack:', Object.keys(colorsList))
    const selectedPack = colorsList[packName as keyof typeof colorsList]

    const config = await loadConfig(configFile)

    config.colors ??= {}

    Object.assign(config.colors, selectedPack)

    await saveConfig(configFile, config)
    console.log(`✅ Color pack "${packName}" imported successfully!`)
  } catch (error) {
    console.error('❌ Error importing color pack:', error)
  }
}

export async function ImportColor(): Promise<void> {
  const args = process.argv.slice(2)
  const colorName = args[1]

  if (!colorName) {
    console.error('❌ Color name is required. Usage: beathers import-color <colorName>')
    return
  }

  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    let foundColor = null
    let foundInPack = ''

    // Search for color in all packs
    for (const [packName, pack] of Object.entries(colorsList)) {
      if (pack[colorName]) {
        foundColor = pack[colorName]
        foundInPack = packName
        break
      }
    }

    if (!foundColor) {
      console.error(`❌ Color "${colorName}" not found in any color pack.`)
      console.log('Available colors:')
      Object.entries(colorsList).forEach(([packName, pack]) => {
        console.log(`  ${packName}: ${Object.keys(pack).join(', ')}`)
      })
      return
    }
    const config = await loadConfig(configFile)

    config.colors ??= {}

    config.colors[colorName] = foundColor

    await saveConfig(configFile, config)
    console.log(`✅ Color "${colorName}" from "${foundInPack}" imported successfully!`)
  } catch (error) {
    console.error('❌ Error importing color:', error)
  }
}
