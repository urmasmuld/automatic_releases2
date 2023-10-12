const fs = require('fs');
const packageJsonPath = 'package.json';

fs.readFile(packageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const packageJson = JSON.parse(data);

  const commitMessage = process.env['GIT_COMMIT_MSG'] || ''; // Read commit message from environment variable

  if (commitMessage.startsWith('fix:')) {
    packageJson.version = 'PATCH'; // Update version for a fix
  } else if (commitMessage.startsWith('feat:')) {
    packageJson.version = 'MINOR'; // Update version for a feature
  } else if (commitMessage.startsWith('rel:')) {
    packageJson.version = 'MAJOR'; // Update version for a release
  }

  fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Updated ${packageJsonPath} version to ${packageJson.version}`);
  });
});
