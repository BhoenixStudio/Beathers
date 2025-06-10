/* eslint-disable no-console */

import { findConfigFile, loadConfig, promptInput, promptSelection, saveConfig } from '@commands'
import { colorsList } from '@data'

export async function AddColors(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const config = await loadConfig(configFile)
    config.colors ??= {}

    while (true) {
      const colorName = await promptInput('🎨 Enter color name (or type "finish" to end): ')
      if (!colorName || colorName.toLowerCase() === 'finish') break

      const lightColor = await promptInput('☀️ Enter light mode color (hex, e.g., #ffffff): ')
      const darkColor = await promptInput('🌙 Enter dark mode color (hex, e.g., #000000): ')

      if (!lightColor && !darkColor) {
        console.error('❌ At least one color (light or dark) is required.')
        continue
      }

      const hexPattern = /^#[0-9A-Fa-f]{6}$/
      if (lightColor && !hexPattern.test(lightColor)) {
        console.error('❌ Invalid light color format. Use hex format like #ffffff')
        continue
      }
      if (darkColor && !hexPattern.test(darkColor)) {
        console.error('❌ Invalid dark color format. Use hex format like #000000')
        continue
      }

      config.colors[colorName] = {
        ...(lightColor && { light: lightColor as `#${string}` }),
        ...(darkColor && { dark: darkColor as `#${string}` }),
      }

      console.log(`✅ Color "${colorName}" added.`)
    }

    await saveConfig(configFile, config)
    console.log('✅ All colors added successfully!')
  } catch (error) {
    console.error('❌ Error adding colors:', error)
  }
}

export async function RemoveColor(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const config = await loadConfig(configFile)

    if (!config.colors || Object.keys(config.colors).length === 0) {
      console.error('❌ No colors found in config.')
      return
    }

    const colorName = await promptInput('Enter color name to remove: ')
    if (!colorName) {
      console.error('❌ Color name is required.')
      return
    }

    if (!config.colors[colorName]) {
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
    const packName = await promptSelection('Choose a color pack:', Object.keys(colorsList))
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
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  try {
    const packName = await promptSelection('Choose a color pack:', Object.keys(colorsList))

    if (!packName) {
      console.error('❌ Color pack is required.')
      return
    }

    const colorName = await promptSelection(
      'Choose a color to import:',
      Object.keys(colorsList[packName as keyof typeof colorsList])
    )

    if (!colorName) {
      console.error('❌ Color name is required.')
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
