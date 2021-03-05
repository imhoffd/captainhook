# Captain Hook 🪝

Git hooks made easy, even for a codfish!

## Install

```
npm i -D captainhook
```

## Uninstall

```
npm uninstall captainhook
```

Add the following to `package.json`:

```json
"hooks": {
  "pre-commit": "npm test"
}
```

## Supported Hooks

Captain Hook supports all [client-side git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).

- `applypatch-msg`
- `pre-applypatch`
- `post-applypatch`
- `pre-commit`
- `prepare-commit-msg`
- `commit-msg`
- `post-commit`
- `pre-rebase`
- `post-checkout`
- `post-merge`
- `post-update`
- `pre-auto-gc`
- `post-rewrite`
- `pre-push`
