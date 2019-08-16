# Node Build Docker

CRUD of documents using express. 
Dockerfile to be used on continuous deployment that can download dependencies, run tests, coverage reports, build image and run.
All commands can be found in the Makefile.

## Getting started:
```bash

# Will run mongo container, build image and run server on docker
make run-docker

```

## Other commands:
```bash
# Run tests
make test

# Run coverage verification
make coverage

```

## Run locally:
```bash
# Download dependencies
make install

# Run server locally
make run
```