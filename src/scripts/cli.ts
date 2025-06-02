#!/usr/bin/env node

import { BuildTheme } from './BuildTheme.js'

async function main() {
  try {
    console.log('🎨 Building Beathers theme...')
    await BuildTheme()
    console.log('✅ Theme built successfully!')
  } catch (error) {
    console.error('❌ Error building theme:', error)
    process.exit(1)
  }
}

main()
