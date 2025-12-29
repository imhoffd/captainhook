#!/bin/sh
# captainhook file
# https://github.com/imhoffd/captainhook

HOOK="$(basename "$0")"
REPO_DIR="$(pwd)"
NODE_MODULES_BIN_DIR="$REPO_DIR/node_modules/.bin"
CAPTAINHOOK_BIN="$NODE_MODULES_BIN_DIR/captainhook"

"$CAPTAINHOOK_BIN" run "$HOOK" "$@"
