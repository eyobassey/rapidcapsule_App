/**
 * lint-staged Configuration
 *
 * Run linters on git staged files
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

module.exports = {
  // TypeScript and TypeScript React files
  '*.{ts,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],

  // JavaScript and JavaScript React files (exclude config files)
  '*.{js,jsx}': [
    (files) => {
      const configFiles = files.filter(
        (file) =>
          !file.includes('.eslintrc') &&
          !file.includes('.commitlintrc') &&
          !file.includes('.lintstagedrc') &&
          !file.includes('.prettierrc')
      );
      return configFiles.length > 0
        ? `eslint --fix --max-warnings=0 ${configFiles.join(' ')}`
        : [];
    },
    'prettier --write',
  ],

  // JSON files
  '*.json': ['prettier --write'],

  // Markdown files
  '*.md': ['prettier --write'],

  // YAML files
  '*.{yml,yaml}': ['prettier --write'],

  // CSS and style files
  '*.{css,scss,sass}': ['prettier --write'],
};
