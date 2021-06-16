const cors = require("cors");
const mongoose = require("mongoose");
const busContoller = require("./controllers/busController");
const stationController = require("./controllers/stationController");
const tripController = require("./controllers/tripController");
const bookingController = require("./controllers/bookingController");
const userController = require("./controllers/userController");

// database connection
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
busContoller(app, mongoose);
stationController(app, mongoose);
tripController(app, mongoose);
bookingController(app, mongoose);
userController(app, mongoose);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
