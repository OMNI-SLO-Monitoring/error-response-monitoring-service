
<p align="center">
  <img src="https://raw.githubusercontent.com/ccims/overview-and-documentation/c97db39633418d2a0d4e5690a810d62fe5ff5247/app_logos/logo_final_6.25p.svg">
</p>

## Description

The Error-Response Monitor receives error messages that conform the error format and creates logs that conform the log message format out of these error messages. It inserts the logs into the the Kafka Queue which is included in the Error-Response Monitor itself. One can use docker compose to start the Error-Response Monitor and the Kafka Queue. Moreover, one can also probe the certain services for semantical correctness by using the combined monitoring frontend and providing the necessary parameters for the request as well as the expected result. Failure of semantical correctness checks will naturally also induce the creation of corresponding logs.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Installation with docker compose

```bash
$ docker-compose build
```
## Running the app with docker

```bash
$ docker-compose up
```

## How to use
The service is located at localhost:3400 whereas the Kafka Queue is at localhost:9092, though using the semantical correctness checks one has to see the documentation for the [combined monitoring frontend](https://github.com/ccims/monitoring-frontend/blob/dev/README.md).



