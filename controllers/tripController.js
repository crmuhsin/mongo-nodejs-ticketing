module.exports = function (zapp, mongoose) {
  //create  a schema - this is like a blueprint
  var tripSchema = new mongoose.Schema({
    from_station_id: String,
    to_station_id: String,
    deperture_time: String,
    fare: String,
    coach_no: String,
    coach_type: String,
  });

  var Trip = mongoose.model("Trip", tripSchema);
  zapp.get("/trip", function (req, res) {
    //get data from mongodb and pass it to view
    Trip.find({}, function (err, data) {
      if (err) throw err;
      res.send(data);
    });
  });

  zapp.post("/trip", function (req, res) {
    // get data from the view and add it to mongodb
    console.log(req);
    var newTrip = Trip(req.body).save(function (err, data) {
      if (err) throw err;
      // res.json(data);
      res.redirect(`admin/listtrip.html`);
    });
  });

  zapp.post("/search-trip", function (req, res) {
    // get data from the view and add it to mongodb
    // console.log(req.body);
    Trip.find(
      {
        from_station_id: req.body.fromStationId,
        to_station_id: req.body.toStationId,
      },
      function (err, data) {
        if (err) throw err;
        res.send(data);
      }
    );
  });

  //delete
  zapp.delete("/trip/:item", function (req, res) {
    // delete requested item from mongodb
    Trip.find({ _id: req.params.item }).remove(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
  //find
  zapp.get("/trip/:item", function (req, res) {
    //get data from mongodb and pass it to view
    Trip.find({ _id: req.params.item }, function (err, data) {
      if (err) throw err;
      console.log(data);
      res.send(data);
    });
  });
  //update
  zapp.post("/trip/:item", function (req, res) {
    // get data from the view and add it to mongodb
    console.log(req.body);
    Trip.update(
      { _id: req.params.item },
      req.body,
      { multi: false },
      function (err, data) {
        if (err) throw err;
        res.redirect(`../admin/listtrip.html`);
      }
    );
  });
};
