# Onemda server

This is the onemda feedback application. This has been developed by the team-onemda at RHOK Melbourne Winter hackathon.

## Technology

- React
- Node
- GraphQL
- Mongo
- Mongoose
- Docker *

### Slack

https://rhokmelbourne.slack.com/messages/CE15DUG9G

### Prerequisites

Node must be installed:

https://nodejs.org/en/download/package-manager/

Mongo must be installed:

https://docs.mongodb.com/manual/installation/

Or you can use docker:

***Insert client setup here***

Yarn must be installed:

https://yarnpkg.com/en/docs/install

## Client

***Insert client setup here***

## Server

Install dependencies
```
yarn
```

### Running the app

```
yarn start
```

OR

```
yarn run server
```

## Running the app using Docker
To start up the client, server and MongoDB:
```
docker-compose up
```

## Populate db with test data
Note that this simply runs `npm run seed` inside the `server` container as it relies on some dependencies in the server application.
```
./seed-db.sh
```

