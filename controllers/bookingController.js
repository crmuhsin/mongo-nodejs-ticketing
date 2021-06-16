module.exports = function (zapp, mongoose) {
  //create  a schema - this is like a blueprint
  var bookingSchema = new mongoose.Schema({
    trip_id: String,
    user_id: String,
    date: String,
    seat_list: Array,
  });

  var Booking = mongoose.model("Booking", bookingSchema);
  //find
  zapp.get("/booking/:item", function (req, res) {
    //get data from mongodb and pass it to view
    Booking.find({ _id: req.params.item }, function (err, data) {
      if (err) throw err;
      res.send(data);
    });
  });

  zapp.post("/booking", function (req, res) {
    // get data from the view and add it to mongodb
    var newBooking = Booking(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  zapp.post("/booking-by-trip", function (req, res) {
    // get data from the view and add it to mongodb
    Booking.find({trip_id: req.body.tripId, date: req.body.searchDate}, function (err, data) {
        if (err) throw err;
        res.send(data);
      }
    );
  });

  // //delete
  // zapp.delete("/trip/:item", function (req, res) {
  //   // delete requested item from mongodb
  //   Booking.find({ _id: req.params.item }).remove(function (err, data) {
  //     if (err) throw err;
  //     res.json(data);
  //   });
  // });

  //find
  zapp.get("/all-booking", function (req, res) {
    //get data from mongodb and pass it to view
    Booking.find({}, function (err, data) {
      if (err) throw err;
      res.send(data);
    });
  });
  // //update
  // zapp.post("/trip/:item", function (req, res) {
  //   // get data from the view and add it to mongodb
  //   Booking.update(
  //     { _id: req.params.item },
  //     req.body,
  //     { multi: false },
  //     function (err, data) {
  //       if (err) throw err;
  //       res.redirect(`../admin/listtrip.html`);
  //     }
  //   );
  // });
};
