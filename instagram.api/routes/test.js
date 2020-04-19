module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({
      msg: "Hello World",
    });
  });

  app.get("/api", (req, res) => {
    app.db.open((err, mongoClient) => {
      mongoClient.collection("posts", function (err, collection) {
        collection.find().toArray(function (err, results) {
          err ? res.json(err) : res.json(results);
          mongoCliente.close();
        });
      });
    });
  });

  app.post("/api", (req, res) => {
    const data = req.body;
    app.db.open((err, mongoClient) => {
      mongoClient.collection("posts", function (err, collection) {
        collection.insert(data, function (err, records) {
          err ? res.json(err) : res.json(records);
          mongoClient.close();
        });
      });
    });
  });
};
