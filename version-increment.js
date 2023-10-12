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
  // Increment the patch version
  packageJson.version = incrementPatch(packageJson.version);
} else if (latestCommitMessage.startsWith('feat:')) {
  // Increment the minor version
  packageJson.version = incrementMinor(packageJson.version);
} else if (latestCommitMessage.startsWith('rel:')) {
  // Increment the major version
  packageJson.version = incrementMajor(packageJson.version);
}

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

function incrementMajor(version) {
  const parts = version.split('.');
  parts[0] = (parseInt(parts[0]) + 1).toString();
  return parts.join('.');
}

function incrementMinor(version) {
  const parts = version.split('.');
  parts[1] = (parseInt(parts[1]) + 1).toString();
  return parts.join('.');
}

function incrementPatch(version) {
  const parts = version.split('.');
  parts[2] = (parseInt(parts[2]) + 1).toString();
  return parts.join('.');
}
