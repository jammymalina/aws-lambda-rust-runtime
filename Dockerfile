FROM lambci/lambda:build-provided
ARG RUST_VERSION=stable
RUN yum install -y jq
RUN echo "Installing rust: $RUST_VERSION"
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --profile minimal --default-toolchain $RUST_VERSION
ADD build.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/build.sh
VOLUME ["/code"]
WORKDIR /code
ENTRYPOINT ["/usr/local/bin/build.sh"]
