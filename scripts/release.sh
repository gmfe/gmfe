#!/bin/bash
set -e

CURRENT=$(node -p "require('./lerna.json').version")
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT"
NEW_VERSION="$MAJOR.$MINOR.$((PATCH + 1))"

echo "==> Current version: $CURRENT"
echo "==> Bumping version to $NEW_VERSION"
npx lerna version "$NEW_VERSION" --no-git-tag-version --no-push --yes

echo "==> Committing version change"
git add lerna.json packages/*/package.json
git commit -m "chore: v$NEW_VERSION"

echo "==> Pushing to master"
git push

echo "==> Done! GitHub Actions will auto-publish to npm."
echo "==> Verify with: npm view @gmfe/react version"
