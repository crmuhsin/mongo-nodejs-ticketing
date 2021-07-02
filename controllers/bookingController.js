const pdf = require("../ticket");
const Helper = require("./Helper");
const mailer = require("../mailer");
const fs = require("fs");

module.exports = function (zapp, mongoose) {
  //create  a schema - this is like a blueprint
  var bookingSchema = new mongoose.Schema({
    trip_id: String,
    user_id: String,
    date: String,
    seat_list: Array,
    created_date: Date
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
    let tripQuery = { 
      trip_id: req.body.tripId,
      date: req.body.searchDate
    };
    Booking.find(tripQuery, function (err, data) {
        if (err) throw err;
        res.send(data);
      }
    );
  });

  zapp.post("/create-ticket", function (req, res) {
    // get data from the view and add it to mongodb
    let fileName = Helper.hashPassword("abc").slice(5, 15);
    let filePath = `public/output/${fileName}.pdf`;
    let writeStream = fs.createWriteStream(filePath);
    pdf.createTicket(writeStream, req.body.trip, req.body.booking);

    let mailParams = { to: req.body.to };
    writeStream.on('finish', function () {
      // do stuff with the PDF file
      mailer.sendMail(mailParams, filePath);
      res.send({fileName});
    });
  });

  //find
  zapp.post("/all-booking", function (req, res) {
    var limit = req.body.limit;
    var pageNo = req.body.pageNo - 1;
    var skip = pageNo * limit;
    var totalCount;
    //get data from mongodb and pass it to view
    Booking.countDocuments({}, function (err, count) {
      if (err) {
        totalCount = 0;
      } else {
        totalCount = count;
      }
      Booking.find()
      .sort({created_date: 'desc'})
      .skip(skip)
      .limit(limit)
      .exec(function (err, data) {
        if (err) {
          return callback("Error Occured", null);
        } else if (!data) {
          return callback("Docs Not Found", null);
        } else {
          var result = {
            totalRecords: totalCount,
            currentPage: pageNo + 1,
            totalPages: Math.ceil(totalCount / limit),
            result: data,
            limit
          };
          return res.status(200).json(result);
        }
      });
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
