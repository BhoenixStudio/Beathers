/* eslint-disable no-console */

import { findConfigFile, loadConfig, promptInput, promptSelection, saveConfig } from '@commands'
import { colorsList } from '@data'

export async function AddColors(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ Config file not found. Please run \x1b[36mbeathers init\x1b[0m to set up your project.')
    return
  }

  try {
    const config = await loadConfig(configFile)
    config.colors ??= {}

    while (true) {
      const colorName = await promptInput('🎨 Color name (type "finish" to complete): ')
      if (!colorName || colorName.toLowerCase() === 'finish') break

      const lightColor = await promptInput('☀️  Light mode color (hex format, e.g., #ffffff): ')
      const darkColor = await promptInput('🌙 Dark mode color (hex format, e.g., #000000): ')

      if (!lightColor && !darkColor) {
        console.error('❌ Please provide at least one color (light or dark mode).')
        continue
      }

      const hexPattern = /^#[0-9A-Fa-f]{6}$/
      if (lightColor && !hexPattern.test(lightColor)) {
        console.error('❌ Invalid light color format. Please use hex format (e.g., #ffffff)')
        continue
      }
      if (darkColor && !hexPattern.test(darkColor)) {
        console.error('❌ Invalid dark color format. Please use hex format (e.g., #000000)')
        continue
      }

      config.colors[colorName] = {
        ...(lightColor && { light: lightColor as `#${string}` }),
        ...(darkColor && { dark: darkColor as `#${string}` }),
      }

      console.log(`✅ Color "${colorName}" added successfully.`)
    }

    console.log('💾 Saving configuration...')
    await saveConfig(configFile, config)
    console.log('✅ All colors saved to your configuration!')
  } catch (error) {
    console.error('❌ Failed to add colors:', error)
  }
}

export async function RemoveColor(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ Config file not found. Please run \x1b[36mbeathers init\x1b[0m to set up your project.')
    return
  }

  try {
    const config = await loadConfig(configFile)

    if (!config.colors || Object.keys(config.colors).length === 0) {
      console.error('❌ No colors found in your configuration.')
      return
    }

    const colorName = await promptInput('🗑️  Color name to remove: ')
    if (!colorName) {
      console.error('❌ Please provide a color name.')
      return
    }

    if (!config.colors[colorName]) {
      console.error(`❌ Color "${colorName}" not found in your configuration.`)
      return
    }

    delete config.colors[colorName]

    console.log('💾 Updating configuration...')
    await saveConfig(configFile, config)
    console.log(`✅ Color "${colorName}" removed successfully!`)
  } catch (error) {
    console.error('❌ Failed to remove color:', error)
  }
}

export async function ImportColorPack(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ Config file not found. Please run \x1b[36mbeathers init\x1b[0m to set up your project.')
    return
  }

  try {
    const packName = await promptSelection('📦 Choose a color pack to import:', Object.keys(colorsList))
    const selectedPack = colorsList[packName as keyof typeof colorsList]

    console.log('💾 Importing color pack...')
    const config = await loadConfig(configFile)

    config.colors ??= {}

    Object.assign(config.colors, selectedPack)

    await saveConfig(configFile, config)
    console.log(`✅ Color pack "${packName}" imported successfully!`)
  } catch (error) {
    console.error('❌ Failed to import color pack:', error)
  }
}

export async function ImportColor(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ Config file not found. Please run \x1b[36mbeathers init\x1b[0m to set up your project.')
    return
  }

  try {
    const packName = await promptSelection('📦 Choose a color pack:', Object.keys(colorsList))

    if (!packName) {
      console.error('❌ Please select a color pack.')
      return
    }

    const colorName = await promptSelection(
      '🎨 Choose a color to import:',
      Object.keys(colorsList[packName as keyof typeof colorsList])
    )

    if (!colorName) {
      console.error('❌ Please select a color.')
      return
    }

    let foundColor = null
    let foundInPack = ''

    for (const [packName, pack] of Object.entries(colorsList)) {
      if (pack[colorName]) {
        foundColor = pack[colorName]
        foundInPack = packName
        break
      }
    }

    if (!foundColor) {
      console.error(`❌ Color "${colorName}" not found in any color pack.`)
      console.log('📋 Available colors:')
      Object.entries(colorsList).forEach(([packName, pack]) => {
        console.log(`   • ${packName}: ${Object.keys(pack).join(', ')}`)
      })
      return
    }

    console.log('💾 Importing color...')
    const config = await loadConfig(configFile)
    config.colors ??= {}
    config.colors[colorName] = foundColor

    await saveConfig(configFile, config)
    console.log(`✅ Color "${colorName}" from "${foundInPack}" imported successfully!`)
  } catch (error) {
    console.error('❌ Failed to import color:', error)
  }
}
