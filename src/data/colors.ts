import { Theme } from '../scripts/types.js'

export const bhoenixColors: Theme['colors'] = {
  b1: { light: '#30302f', dark: '#c5c5c2' },
  b2: { light: '#e15a26', dark: '#ed703f' },
  b3: { light: '#1e3767', dark: '#8398c0' },
}

export const basicColors: Theme['colors'] = {
  black: { light: '#000000' },
  white: { light: '#ffffff' },
  gray: { light: '#808080' },
  red: { light: '#ff0000' },
  green: { light: '#00ff00' },
  blue: { light: '#0000ff' },
  yellow: { light: '#ffff00' },
  orange: { light: '#ffa500' },
  purple: { light: '#800080' },
  teal: { light: '#008080' },
  silver: { light: '#c0c0c0' },
  gold: { light: '#ffd700' },
}

export const socialColors: Theme['colors'] = {
  facebook: { light: '#3b5998' },
  messenger: { light: '#006aff' },
  whatsapp: { light: '#25d366' },
  instagram: { light: '#3f729b' },
  google: { light: '#4285f4' },
  signal: { light: '#2190e8' },
  twitter: { light: '#00acee' },
  telegram: { light: '#0088cc' },
  youtube: { light: '#ff0000' },
  linkedin: { light: '#0077b5' },
  behance: { light: '#053eff' },
  github: { light: '#171515' },
  gitlab: { light: '#fca326' },
  wechat: { light: '#09b83e' },
  tiktok: { light: '#ff0050' },
  snapchat: { light: '#fffc00' },
  pinterest: { light: '#e60023' },
  reddit: { light: '#ff4500' },
  teams: { light: '#464eb8' },
  twitch: { light: '#6441a5' },
  dribbble: { light: '#ea4c89' },
}

export const customColors: Theme['colors'] = {
  'custom-1': { light: '#4289c7', dark: '#75b0e4' },
  'custom-2': { light: '#39c2cb', dark: '#79e2e9' },
  'custom-3': { light: '#36c07e', dark: '#86f3be' },
  'custom-4': { light: '#a84fd1', dark: '#cd87ee' },
  'custom-5': { light: '#df4f60', dark: '#df7884' },
  'custom-6': { light: '#dec338', dark: '#e6d689' },
  'custom-7': { light: '#ea6e2c', dark: '#e29f7b' },
  'custom-8': { light: '#a66d38', dark: '#e3b387' },
  'custom-9': { light: '#eb30a0', dark: '#e779bb' },
  'custom-10': { light: '#1e24a5', dark: '#5d64ea' },
}

export const colorsList = {
  'Bhoenix colors': bhoenixColors,
  'Basic colors': basicColors,
  'Social colors': socialColors,
  'Custom colors': customColors,
}
