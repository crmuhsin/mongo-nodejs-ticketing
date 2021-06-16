module.exports = function (zapp, mongoose) {
  //create  a schema - this is like a blueprint
  var stationSchema = new mongoose.Schema({
    station_name: String,
    desc: String,
  });

  var Station = mongoose.model("Station", stationSchema);
  zapp.get("/station", function (req, res) {
    //get data from mongodb and pass it to view
    Station.find({}, function (err, data) {
      if (err) throw err;
      res.send(data);
    });
  });

  zapp.post("/station", function (req, res) {
    // get data from the view and add it to mongodb
    var newStation = Station(req.body).save(function (err, data) {
      if (err) throw err;
      // res.json(data);
      res.redirect(`admin/liststation.html`);
    });
  });

  zapp.delete("/station/:item", function (req, res) {
    // delete requested item from mongodb
    Station.find({ _id: req.params.item }).remove(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  zapp.get("/station/:item", function (req, res) {
    //get data from mongodb and pass it to view
    Station.find({ _id: req.params.item }, function (err, data) {
      if (err) throw err;
      res.send(data);
    });
  });

  //update
  zapp.post("/station/:item", function (req, res) {
    // get data from the view and add it to mongodb
    Station.update(
      { _id: req.params.item },
      req.body,
      { multi: false },
      function (err, data) {
        if (err) throw err;
        res.redirect(`../admin/liststation.html`);
      }
    );
  });
};
