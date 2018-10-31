# MongoDB Stitch Cron

A simple stitch app to run as a cron service on MongoDB Stitch, using MongoDB TTL.

[![Powered by Stitch](http://badge.learnstitch.com/?appid=cron-ypfzq)(http://cloud.mongodb.com)]

This repository contains a stitch app configured as a database trigger for a DELETE event.

The DELETE event occurs when a document within a collection containing a TTL index is deleted. The app then inserts a new document into the collection with the current date, thus causing a rough timed loop.

# Setup

- Install [node](https://nodejs.org/en/download/current/). This repository's node version can be found in [.nvmrc](./nvmrc).

- Install [yarn](https://yarnpkg.com/lang/en/docs/install/).

- Sign up for [MongoDB Stitch](https://www.mongodb.com/cloud/stitch)

- Install the [Stitch CLI](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference/#installation).

- Make a cluster, and add the cluster name in the atlas [config.json](./cron/services/mongodb-atlas/config.json#L5).

- Generate an atlas [API key](https://docs.atlas.mongodb.com/configure-api-access/#generate-api-key).

- Login to stitch:
```
  stitch-cli login --username=<MongoDB Cloud username> --api-key=<MongoDB Atlas API Key>
```

- Modify the code in [source.js](./cron/functions/cronHelloWorld/source.js) to your needs. Ensure that you re-insert the deleted key back into the database.

- Deploy the stitch app and link it to your cluster:
```
stitch-cli import
```
- Install dependencies:
```
yarn install
```
- Setup the database TTL index and insert a document.
```
  MONGODB_HOST=<your mongodb connection string> node setup.js
```

You can view the logs for the stitch app in the left side of your stitch app dashboard.

## [Contributing](./CONTRIBUING.md)

## Resources

| Resource | Description |
| --- | --- |
| [Stitch Docs](https://docs.mongodb.com/stitch/) | MongoDB Stitch Documentation |
| [MongoDB Docs](https://docs.mongodb.com) | MongoDB Documentation |
| [MongoDB Community Slack](https://launchpass.com/mongo-db) | MongoDB Community Slack |
| [DatabaseTriggers](https://docs.mongodb.com/stitch/triggers/database-triggers/)|Setting up Stitch apps as database triggers|
|[Database TTL](https://docs.mongodb.com/manual/tutorial/expire-data/)|Expire data from a collection by setting a TTL|
