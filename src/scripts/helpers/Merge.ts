import { Theme } from '@types'

export function DeepMerge(defaults: Partial<Theme>, configs: Partial<Theme> | null): Theme {
  if (!configs) return defaults as Theme

  const { colors: tColors, roles: tRoles, settings: tSettings, typography: tTypography } = defaults ?? {}
  const { colors: sColors, roles: sRoles, settings: sSettings, typography: sTypography } = configs ?? {}

  const colors: Theme['colors'] = { ...tColors, ...sColors }
  const roles: Theme['roles'] = { ...tRoles, ...sRoles }
  const settings = {
    ...tSettings,
    ...sSettings,
    ...(tSettings?.breakpoints ||
      (sSettings?.breakpoints && { breakpoints: { ...tSettings?.breakpoints, ...sSettings?.breakpoints } })),
    ...(tSettings?.wrappers ||
      (sSettings?.wrappers && { wrappers: { ...tSettings?.wrappers, ...sSettings?.wrappers } })),
    ...(tSettings?.guttersValues ||
      (sSettings?.guttersValues && { guttersValues: { ...tSettings?.guttersValues, ...sSettings?.guttersValues } })),
  }
  const typography = {
    ...tTypography,
    ...sTypography,
    ...(tTypography?.fontSizes ||
      (sTypography?.fontSizes && { fontSizes: { ...tTypography?.fontSizes, ...sTypography?.fontSizes } })),
    ...(tTypography?.fonts || (sTypography?.fonts && { fonts: { ...tTypography?.fonts, ...sTypography?.fonts } })),
  }

  return { colors, roles, settings, typography }
}
