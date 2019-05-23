import { MongoClient } from "mongodb";
import { config } from "./../config";

const {
  db: { host, database, port }
} = config;

const state: any = {
  db: null
};

const url: string = `mongodb://${host}:${port}`;

const mongoOptions = {
  useNewUrlParser: true
};

const connect = (cb: any) => {
  if (state.db) {
    cb();
  }
  MongoClient.connect(url, mongoOptions, (err, client) => {
    if (err) {
      cb(err);
    }
    state.db = client.db(database);
    cb();
  });
};

const getDB = () => {
  return state.db;
};

export const db = { connect, getDB };
