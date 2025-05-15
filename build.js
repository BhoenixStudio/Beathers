const { execSync } = require('child_process');

execSync('pnpm run build-css', { stdio: 'inherit', shell: true });
