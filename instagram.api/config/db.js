mongodb = require('mongodb');
const db = new mongodb.Db(
  'instagram',
  new mongodb.Server('localhost', '27017', {}), {}
)
module.exports = db;