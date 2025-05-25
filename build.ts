import { execSync } from 'child_process';

execSync('pnpm run build-css', { stdio: 'inherit' });
