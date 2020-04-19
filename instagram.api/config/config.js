const express = require("express");
const bodyParser = require("body-parser");
const multiparty = require("connect-multiparty");
const cors = require("cors");
const consign = require("consign");
const db = require("./db");
const objectId = require("mongodb").ObjectId;
const fs = require("fs");
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost" }));
app.use(multiparty());
app.db = db;
app.objectId = objectId;
app.fs = fs;
consign().then("./routes").into(app);
module.exports = app;
