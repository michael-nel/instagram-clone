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

  app.get("/spool/:image", (req, res) => {
    var img = req.params.image;

    app.fs.readFile("./spool/" + img, function (err, content) {
      if (err) {
        res.status(400).json(err);
        return;
      }

      res.writeHead(200, { "content-type": "image/jpg" });
      res.end(content);
    });
  });

  app.post("/api", (req, res) => {
    let date = new Date();
    let time_stamp = date.getTime();
    let url_image = time_stamp + "_" + req.files.file.originalFilename;
    const path_origin = req.files.file.path;
    const path_to = "./spool/" + url_image;
    app.fs.rename(path_origin, path_to, function (err) {
      if (err) {
        res.status(500).json({
          error: err,
        });
        return;
      }
      var data = {
        url_image: url_image,
        title: req.body.title,
      };

      app.db.open((err, mongoClient) => {
        mongoClient.collection("posts", function (err, collection) {
          collection.insert(data, function (err, records) {
            err ? res.json(err) : res.json(records);
            mongoClient.close();
          });
        });
      });
    });
  });

  app.put("/api/:id", (req, res) => {
    app.db.open((err, mongoClient) => {
      mongoClient.collection("posts", function (err, collection) {
        collection.update(
          {
            _id: app.objectId(req.params.id),
          },
          {
            $set: {
              title: req.body.title,
            },
          },
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
        collection.remove(
          {
            _id: app.objectId(req.params.id),
          },
          function (err, records) {
            err ? res.json(err) : res.json(records);
          }
        );
        mongoClient.close();
      });
    });
  });
};
