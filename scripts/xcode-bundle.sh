#!/bin/bash

# Print commands before executing them (useful for troubleshooting)
set -x
DEST=$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH

RECTAVALO_SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_ROOT=${PROJECT_ROOT:-"$RECTAVALO_SCRIPTS_DIR"}

if [[ ! "$CONFIGURATION" = *Release* ]]; then
  # This is only required for release
  exit 0
fi

if [ ! -d "$PROJECT_ROOT/_build/static_html" ]; then
  echo "static html xform path doesn't exist, run "
  echo "node scripts/release build-web-app"
  echo "node scripts/release xform-web-app"
  exit 1
fi

rm -rf "$DEST/react-static"
cp -r "$PROJECT_ROOT/_build/static_html" "$DEST/react-static"

exit 0
