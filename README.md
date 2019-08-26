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

## REST API Documentation

All available REST API documentation exposed by the project was documented using the [OpenAPI](https://www.openapis.org/) standard.

To view this documentation locally use the following command:
```bash
make run-swagger
```

## Generate diagrams:

In order to facilitate the documentation process, a command is available to generate `.png` images from `.puml` files.

```bash
make create-diagrams 
```

Files are generated and available inside `docs/diagrams`.

_Diagrams are defined using a simple and intuitive language [PlantUML](http://plantuml.com/)._