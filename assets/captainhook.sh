HOOK="$(basename "$0")"
HOOKS_DIR="$(dirname "$0")"
GIT_DIR="$(dirname "$HOOKS_DIR")"
REPO_DIR="$(dirname "$GIT_DIR")"
NODE_MODULES_BIN_DIR=""$REPO_DIR"/node_modules/.bin"
CAPTAINHOOK_BIN=""$NODE_MODULES_BIN_DIR"/captainhook"

"$@" "$CAPTAINHOOK_BIN" "$HOOK" "$*"
