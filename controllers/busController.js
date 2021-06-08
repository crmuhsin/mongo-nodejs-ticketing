module.exports = function (zapp, mongoose) {
  //create  a schema - this is like a blueprint
  var busSchema = new mongoose.Schema({
    coach_no: String,
    coach_type: String,
  });

  var Bus = mongoose.model("Bus", busSchema);
  zapp.get("/bus", function (req, res) {
    //get data from mongodb and pass it to view
    Bus.find({}, function (err, data) {
      if (err) throw err;
      console.log(data);
      res.send(data);
    });
  });

  zapp.post("/bus", function (req, res) {
    // get data from the view and add it to mongodb
    console.log(req.body);
    var newBus = Bus(req.body).save(function (err, data) {
      if (err) throw err;
      // res.json(data);
      res.redirect(`admin/listbus.html`);
    });
  });

  zapp.delete("/bus/:item", function (req, res) {
    // delete requested item from mongodb
    Bus.find({ _id: req.params.item }).remove(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
  //find
  zapp.get("/bus/:item", function (req, res) {
    //get data from mongodb and pass it to view
    Bus.find({ _id: req.params.item }, function (err, data) {
      if (err) throw err;
      console.log(data);
      res.send(data);
    });
  });
  //update
  zapp.post("/bus/:item", function (req, res) {
    // get data from the view and add it to mongodb
    console.log(req.body);
    Bus.update(
      { _id: req.params.item },
      req.body,
      { multi: false },
      function (err, data) {
        if (err) throw err;
        res.redirect(`../admin/listbus.html`);
      }
    );
  });
};
