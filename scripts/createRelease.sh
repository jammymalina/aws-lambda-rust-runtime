#!/bin/bash

RUST_VERSION=$1

echo "Generating release: $RUST_VERSION"

npm run generate-dockerfile -- $RUST_VERSION
git add Dockerfile
git commit -m "Generating docker file with version: $RUST_VERSION"
git tag -a v$RUST_VERSION -m "release $RUST_VERSION"
git push origin
git push origin --tags
