const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = require(packageJsonPath);
const commitMessage = process.argv[2];

if (commitMessage.includes('fix:')) {
    const parts = packageJson.version.split('.');
    parts[2] = (parseInt(parts[2]) + 1).toString();
    packageJson.version = parts.join('.');
} else if (commitMessage.includes('feat:')) {
    const parts = packageJson.version.split('.');
    parts[1] = (parseInt(parts[1]) + 1).toString();
    packageJson.version = parts.join('.');
} else if (commitMessage.includes('rel:')) {
    const parts = packageJson.version.split('.');
    parts[0] = (parseInt(parts[0]) + 1).toString();
    packageJson.version = parts.join('.');
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
