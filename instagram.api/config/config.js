const express = require("express");
const bodyParser = require("body-parser");
const multiparty = require('connect-multiparty');
const consign = require("consign");
const db = require("./db");
const objectId = require("mongodb").ObjectId;
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(multiparty());
app.db = db;
app.objectId = objectId;
consign().then("./routes").into(app);
module.exports = app;