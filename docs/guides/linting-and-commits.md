# Linting and Commit Guidelines

**Created:** February 13, 2026  
**Author:** Aarav Mishra

## Overview

This project uses ESLint, Prettier, Conventional Commits, and lint-staged to maintain code quality and consistent commit messages.

## ESLint

### Configuration

ESLint is configured in `.eslintrc.js` with the following setup:

- **Base Config:** Expo/React Native
- **TypeScript Support:** Full TypeScript linting with strict rules
- **React Rules:** React, React Hooks, and React Native specific rules
- **Prettier Integration:** ESLint and Prettier work together seamlessly

### Key Rules

- **No `any` types:** Enforced via `@typescript-eslint/no-explicit-any: 'error'`
- **No relative imports:** Must use `@` aliases (e.g., `@/components/base/Button`)
- **React Hooks:** Enforces rules of hooks and exhaustive dependencies
- **Unused variables:** Warns about unused variables (ignores `_` prefixed)

### Usage

```bash
# Check for linting errors
pnpm lint

# Auto-fix linting errors
pnpm lint:fix
```

## Prettier

### Configuration

Prettier is configured in `.prettierrc.js`:

- **Semicolons:** Enabled
- **Single Quotes:** Enabled for JS/TS
- **Trailing Commas:** ES5 compatible
- **Print Width:** 100 characters
- **Tab Width:** 2 spaces

### Usage

```bash
# Format all files
pnpm format

# Check formatting without changing files
pnpm format:check
```

## Conventional Commits

### Configuration

Commitlint is configured in `.commitlintrc.js` to enforce Conventional Commits format.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or external dependencies
- `ci`: CI configuration changes
- `chore`: Other changes that don't modify src or test files
- `revert`: Revert a previous commit

### Examples

```bash
# Feature
git commit -m "feat(components): add AppButton component"

# Bug fix
git commit -m "fix(api): resolve token refresh issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# With scope and body
git commit -m "feat(auth): implement OAuth2 flow

Add OAuth2 authentication flow with token refresh mechanism.
Includes secure storage integration and error handling."
```

### Breaking Changes

For breaking changes, add `!` after the type:

```bash
git commit -m "feat!(api): change API response structure

BREAKING CHANGE: API responses now wrap data in 'result' field"
```

## lint-staged

### Configuration

lint-staged runs automatically on git commit via Husky. Configuration is in `.lintstagedrc.js`.

### What It Does

Before each commit, lint-staged:

1. Runs ESLint with auto-fix on staged `.ts`, `.tsx`, `.js`, `.jsx` files
2. Formats staged files with Prettier
3. Blocks commit if linting errors remain

### File Patterns

- **TypeScript/JavaScript:** ESLint + Prettier
- **JSON:** Prettier only
- **Markdown:** Prettier only
- **YAML:** Prettier only
- **CSS/SCSS:** Prettier only

## Husky Git Hooks

### Pre-commit Hook

Runs `lint-staged` to lint and format staged files before commit.

### Commit-msg Hook

Validates commit messages against Conventional Commits format using commitlint.

## Workflow

### Typical Development Flow

1. **Make changes** to code
2. **Stage files** with `git add`
3. **Commit** with `git commit -m "type(scope): message"`
4. **Pre-commit hook** runs automatically:
   - ESLint checks and fixes code
   - Prettier formats code
   - If errors remain, commit is blocked
5. **Commit-msg hook** validates commit message format
6. **If valid**, commit succeeds

### Bypassing Hooks (Not Recommended)

If you need to bypass hooks (e.g., for WIP commits):

```bash
git commit --no-verify -m "wip: work in progress"
```

**Note:** Only use `--no-verify` when absolutely necessary. It bypasses all quality checks.

## IDE Integration

### VS Code

Install these extensions:

- ESLint
- Prettier - Code formatter

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

## Troubleshooting

### ESLint Errors

If you see ESLint errors:

1. Run `pnpm lint:fix` to auto-fix issues
2. Check `.eslintrc.js` for rule configuration
3. For specific files, add `/* eslint-disable */` at the top (use sparingly)

### Prettier Conflicts

If Prettier and ESLint conflict:

1. Ensure `eslint-config-prettier` is last in `.eslintrc.js` extends array
2. Run `pnpm format` to format files
3. Run `pnpm lint:fix` to fix ESLint issues

### Commit Message Rejected

If commit message is rejected:

1. Check the error message from commitlint
2. Ensure format follows: `type(scope): subject`
3. Use lowercase for type and scope
4. Keep subject under 100 characters

### Husky Hooks Not Running

If hooks don't run:

1. Ensure `.husky` directory exists
2. Run `pnpm prepare` to initialize Husky
3. Check that hooks are executable: `chmod +x .husky/*`
4. Verify git hooks path: `git config core.hooksPath`

## Best Practices

1. **Run linting before committing:** Use `pnpm lint` to check issues early
2. **Format code regularly:** Use `pnpm format` to keep code consistent
3. **Write clear commit messages:** Follow Conventional Commits format
4. **Use meaningful scopes:** Scope should indicate the area of change
5. **Keep commits focused:** One logical change per commit
6. **Don't bypass hooks:** Only use `--no-verify` in exceptional cases

## Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [lint-staged](https://github.com/okonet/lint-staged)
- [Husky](https://typicode.github.io/husky/)
