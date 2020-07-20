#!/bin/bash

RUST_VERSION=$1

REPO=jammymalina/aws-lambda-rust-runtime
TAG="$REPO:version-$RUST_VERSION"

echo "Generating release: $RUST_VERSION"

npm run build --rust=$RUST_VERSION --tag=$TAG
docker image push $TAG
