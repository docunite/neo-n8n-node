# Contributing to n8n-nodes-neo

Thank you for your interest in contributing to n8n-nodes-neo! 🎉

## Setting up the Development Environment

1. **Fork and clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/n8n-nodes-neo.git
cd n8n-nodes-neo
```

2. **Install dependencies**
```bash
npm install
```

3. **Build the node**
```bash
npm run build
```

4. **Test in a local n8n instance**
```bash
# Link the node
npm link

# In your n8n directory
cd ~/.n8n
npm link n8n-nodes-neo

# Start n8n
n8n start
```

## Code Style

We use ESLint and Prettier for consistent code style:

```bash
# Linting
npm run lint

# Automatic fixes
npm run lintfix

# Formatting
npm run format
```

## Pull Requests

1. Create a branch for your changes:
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. Commit your changes:
   ```bash
   git commit -m "feat: description of change"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```

4. Create a Pull Request on GitHub

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding/changing tests
- `chore:` - Maintenance tasks

## Testing

Before creating a Pull Request:

1. Test all modified operations in n8n
2. Ensure the build succeeds
3. Run linting

## Questions?

If you have questions, you can:
- Open an issue on GitHub
- Send an email to support@docunite.com

Thank you for your contribution! 🙏
