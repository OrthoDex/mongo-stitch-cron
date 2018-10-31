'use strict';

const mongodb = require('mongodb');
const { MongoClient } = mongodb;

const url = process.env.MONGODB_HOST;

const dbName = "cron"; // needed by cron script in cron/functions/source.js
const collectionName = "minute";

(async function () {
  let client;
  try {
    client = await MongoClient.connect(url);

    console.log("Connected to server");

    const db = client.db(dbName);

    const minuteCollection = db.collection(collectionName);

    minuteCollection.createIndex({ "createdAt": 1 }, {
      expireAfterSeconds: 60 // expire the document after 1 minute
    });
    console.log("Minute TTL Created"); // See https://docs.mongodb.com/manual/tutorial/expire-data/ for MongoDB's TTL

    await minuteCollection.insertOne({
      "createdAt": new Date()
    }); // Create a single doc
    console.log("Document Inserted.");
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
    process.exit(0);
  }
}());
