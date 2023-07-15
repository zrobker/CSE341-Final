require("dotenv").config();

const mongoose = require("mongoose");

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  mongoose
    .connect(process.env.DB_CONNECTION)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

const closeDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  mongoose.connection.close();
};

const getCollection = (collectionName) => {
  return mongoose.connection.collection(collectionName);
};

module.exports = {
  initDb,
  getDb,
  closeDb,
  getCollection,
};
