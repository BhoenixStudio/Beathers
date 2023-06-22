const { execSync } = require('child_process');

execSync('yarn run build-css', { stdio: 'inherit', shell: true });
