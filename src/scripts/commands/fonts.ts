/* eslint-disable no-console */

import { findConfigFile, loadConfig, promptInput, promptSelection, promptUser, saveConfig } from '@commands'
import { importedFont, localFont } from '@data'
import { FontType, FontVariant } from '@types'

export async function AddFont(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "\x1b[34mbeathers init\x1b[0m" first.')
    return
  }
  const question = (q: string, locale: string): string => {
    const lang: string = locale.toUpperCase()
    const questions: Record<string, string> = {
      title: `\x1b[36m📝 Enter "${lang} variant" title:\x1b[0m `,
      unicode: `\x1b[36m🔤 Enter "${lang} variant" unicode range (optional):\x1b[0m `,
      isLocal: `\x1b[33m🔤 Is "${lang} variant" a local font?\x1b[0m\n\x1b[32m[Y]\x1b[0m Yes \x1b[31m[N]\x1b[0m No: `,
      url: `\x1b[36m🌐 Enter "${lang} variant" URL (must start with http:// or https://):\x1b[0m `,
      format: `\x1b[36m📄 Choose "${lang} variant" format:\x1b[0m`,
    }

    return questions[q]
  }

  try {
    const fontName = await promptInput('\x1b[36m📝 Enter font name:\x1b[0m ')
    if (!fontName) {
      console.error('❌ Font name is \x1b[31mrequired\x1b[0m.')
      return
    }

    const weightsInput = await promptInput(
      '\x1b[36m⚖️ Enter font weights (comma-separated, e.g., light,regular,bold) (optional):\x1b[0m '
    )
    const weights = weightsInput?.split(',').map((w) => w.trim())

    const stylesInput = await promptInput(
      '\x1b[36m🎨 Enter font styles (comma-separated, e.g., normal,italic) (optional):\x1b[0m '
    )
    const styles = stylesInput?.split(',').map((s) => s.trim())

    const localesInput = await promptInput(
      '\x1b[36m🌐 Enter font variant locales (comma-separated, e.g., en,ar):\x1b[0m '
    )
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
          console.error('❌ Invalid URL format. URL must start with \x1b[36mhttp://\x1b[0m or \x1b[36mhttps://\x1b[0m')
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
    console.log(`✅ Successfully added font \x1b[32m"${fontName}"\x1b[0m!`)
  } catch (error) {
    console.error('❌ Error adding font:', error)
  }
}

export async function RemoveFont(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "\x1b[34mbeathers init\x1b[0m" first.')
    return
  }
  const fontName = await promptInput(
    '\x1b[36m🗑️ Enter font name to remove:\x1b[0m\n\x1b[33mThis will delete all weights, styles, and variants of the selected font.\x1b[0m\n> '
  )
  if (!fontName) {
    console.error('❌ Font name is \x1b[31mrequired\x1b[0m.')
    return
  }
  try {
    const config = await loadConfig(configFile)

    if (!config.typography?.fonts?.[fontName]) {
      console.error(`❌ Font "\x1b[31m${fontName}\x1b[0m" not found in config.`)
      return
    }

    delete config.typography.fonts[fontName]

    await saveConfig(configFile, config)
    console.log(`✅ Successfully removed font \x1b[32m"${fontName}"\x1b[0m!`)
  } catch (error) {
    console.error('❌ Error removing font:', error)
  }
}

export async function ImportFont(): Promise<void> {
  const configFile = await findConfigFile()
  if (!configFile) {
    console.error('❌ No config file found. Run "\x1b[34mbeathers init\x1b[0m" first.')
    return
  }
  const isLocal = await promptUser(
    '\x1b[33m🔤 Do you want a local font?\x1b[0m\n\x1b[32m[Y]\x1b[0m Yes \x1b[31m[N]\x1b[0m No: '
  )
  const fontName = await promptInput('\x1b[36m📝 Enter font name:\x1b[0m ')

  if (!fontName) {
    console.error('❌ Font name is \x1b[31mrequired\x1b[0m.')
    return
  }

  try {
    const config = await loadConfig(configFile)

    config.typography ??= {}
    config.typography.fonts ??= {}

    config.typography.fonts[fontName] = isLocal ? localFont : importedFont

    await saveConfig(configFile, config)
    console.log(`✅ Successfully imported sample font \x1b[32m"${fontName}"\x1b[0m!`)
  } catch (error) {
    console.error('❌ Error importing font sample:', error)
  }
}
