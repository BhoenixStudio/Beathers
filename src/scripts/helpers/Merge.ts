import { Theme } from '../types.js'

export function DeepMerge(defaults: Partial<Theme>, configs: Partial<Theme> | null): Theme {
  if (!configs) return defaults as Theme

  const {
    colors: tColors,
    roles: tRoles,
    settings: tSettings,
    typography: tTypography,
    glass: tGlass,
    loader: tLoader,
  } = defaults ?? {}
  const {
    colors: sColors,
    roles: sRoles,
    settings: sSettings,
    typography: sTypography,
    glass: sGlass,
    loader: sLoader,
  } = configs ?? {}

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
  const glass: Theme['glass'] = { ...tGlass, ...sGlass }
  const loader: Theme['loader'] = { ...tLoader, ...sLoader }

  return { colors, roles, settings, typography, glass, loader }
}
