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
          mongoClient.close();
        });
      });
    });
  });

  app.get("/api/:id", (req, res) => {
    app.db.open((err, mongoClient) => {
      mongoClient.collection("posts", function (err, collection) {
        collection
          .find(app.objectId(req.params.id))
          .toArray(function (err, results) {
            err ? res.json(err) : res.json(results);
            mongoClient.close();
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

  app.put("/api/:id", (req, res) => {
    app.db.open((err, mongoClient) => {
      mongoClient.collection("posts", function (err, collection) {
        collection.update(
          { _id: app.objectId(req.params.id) },
          { $set: { title: req.body.title } },
          {},
          function (err, records) {
            err ? res.json(err) : res.json(records);
          }
        );
        mongoClient.close();
      });
    });
  });

  app.delete("/api/:id", (req, res) => {
    app.db.open((err, mongoClient) => {
      mongoClient.collection("posts", function (err, collection) {
        collection.remove({ _id: app.objectId(req.params.id) }, function (
          err,
          records
        ) {
          err ? res.json(err) : res.json(records);
        });
        mongoClient.close();
      });
    });
  });
};
