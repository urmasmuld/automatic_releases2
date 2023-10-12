const fs = require('fs');
const semver = require('semver');
const packageJson = require('./package.json');

const commitMessage = process.env.HUSKY_GIT_PARAMS;

const incrementVersion = (currentVersion, commitMessage) => {
  if (commitMessage.includes('fix:')) {
    return semver.inc(currentVersion, 'patch');
  } else if (commitMessage.includes('feat:')) {
    return semver.inc(currentVersion, 'minor');
  } else if (commitMessage.includes('rel:')) {
    return semver.inc(currentVersion, 'major');
  }
  return null; // Return null if no increment needed
};

const newVersion = incrementVersion(packageJson.version, commitMessage);

if (newVersion) {
  packageJson.version = newVersion;
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
}
