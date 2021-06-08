const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const busContoller = require("./controllers/busController");
const stationController = require("./controllers/stationController");
const tripController = require("./controllers/tripController");

// database connection
mongoose.connect("mongodb://localhost:27017/exclusive");
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
busContoller(app, mongoose);
stationController(app, mongoose);
tripController(app, mongoose);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
