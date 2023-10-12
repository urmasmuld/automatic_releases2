const fs = require('fs');
const path = require('path');

// Load the package.json file
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

// Get the latest commit message
const latestCommitMessage = require('child_process')
  .execSync('git log -1 --pretty=%s')
  .toString()
  .trim();

// Update the version based on the commit message
if (latestCommitMessage.startsWith('fix:')) {
  // Extract the current version
  const currentVersion = packageJson.version;
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  // Increment the patch version
  packageJson.version = `${major}.${minor}.${patch + 1}`;
} else if (latestCommitMessage.startsWith('feat:')) {
  // Increment the minor version
  // Implement similar logic as above
} else if (latestCommitMessage.startsWith('rel:')) {
  // Increment the major version
  // Implement similar logic as above
}

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
