// db.js
const mongoose = require("mongoose");

class Database {
  constructor() {
    this.URI = process.env.LOCALENS_DB_URI;

    mongoose.connect(this.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

module.exports = Database.getInstance();
