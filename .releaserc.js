module.exports = {
    branches: ['main'], // Define the branch to trigger releases
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      [
        '@semantic-release/changelog',
        {
          changelogFile: 'CHANGELOG.md',
        },
      ],
      '@semantic-release/npm',
      '@semantic-release/github',
    ],
    preset: 'conventionalcommits',
  };
  