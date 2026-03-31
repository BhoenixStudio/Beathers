import { execSync } from 'node:child_process'

execSync('npm run build:pack', { stdio: 'inherit' })
