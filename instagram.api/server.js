const app = require('./config/config')
const db = require('./config/db')
app.db = db;
let port = 8080;
app.listen(port);
console.log("Server On ->" + port);