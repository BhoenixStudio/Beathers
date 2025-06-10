/* eslint-disable no-console */

import { findConfigFile, loadConfig, promptInput, promptSelection, promptUser, saveConfig } from '@commands'
import { importedFont, localFont } from '@data'
import { FontType, FontVariant } from '@types'

export async function AddFont(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  const question = (q: string, locale: string): string => {
    const lang: string = locale.toUpperCase()
    const questions: Record<string, string> = {
      title: `Enter "${lang} variant" title: `,
      unicode: `Enter "${lang} variant" unicode range (optional): `,
      isLocal: `Is "${lang} variant" a local font? (Y/N): `,
      url: `Enter "${lang} variant" URL (must start with http:// or https://): `,
      format: `Choose "${lang} variant" format:`,
    }

    return questions[q]
  }

  try {
    const fontName = await promptInput('📝 Enter font name: ')
    if (!fontName) {
      console.error('❌ Font name is required.')
      return
    }

    const weightsInput = await promptInput(
      'Enter font weights (comma-separated, e.g., light,regular,bold) (optional): '
    )
    const weights = weightsInput?.split(',').map((w) => w.trim())

    const stylesInput = await promptInput('Enter font styles (comma-separated, e.g., normal,italic) (optional): ')
    const styles = stylesInput?.split(',').map((s) => s.trim())

    const localesInput = await promptInput('Enter font variant locales (comma-separated, e.g., en,ar): ')
    const locales = localesInput?.split(',').map((w) => w.trim())

    const variants: Record<string, FontVariant> = {}

    for (const l of locales) {
      let url, format

      const title = await promptInput(question('title', l))
      const unicode = await promptInput(question('unicode', l))
      const isLocal = await promptUser(question('isLocal', l))

      if (!isLocal)
        while (true) {
          url = await promptInput(question('url', l))
          if (url && /^https?:\/\//.test(url)) break
          console.error('❌ Invalid URL format. URL must start with http:// or https://')
        }
      else format = await promptSelection(question('format', l), ['woff2', 'woff'])

      variants[l] = {
        title: title ?? fontName,
        ...(unicode && { unicode }),
        ...(format && { format }),
        ...(isLocal === false && { isLocal }),
        ...(!isLocal && url && { url: url as `https://${string}` | `http://${string}` }),
      }
    }

    const font: FontType = {
      ...(weights.length > 0 && {
        weights: weights.filter((w) =>
          ['thin', 'extra-light', 'light', 'regular', 'medium', 'semibold', 'bold', 'extra-bold', 'black'].includes(w)
        ) as FontType['weights'],
      }),
      ...(styles.length > 0 && {
        styles: styles.filter((s) => ['normal', 'italic', 'oblique'].includes(s)) as FontType['styles'],
      }),
      variants,
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
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "beathers init" first.')
    return
  }

  const fontName = await promptInput(
    'Enter font name to remove:\nThis will delete all weights, styles, and variants of the selected font.\n> '
  )
  if (!fontName) {
    console.error('❌ Font name is required.')
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
