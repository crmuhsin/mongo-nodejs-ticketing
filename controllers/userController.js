
const Helper = require("./Helper");

module.exports = function (zapp, mongoose) {
    //create  a schema - this is like a blueprint
    var userSchema = new mongoose.Schema({
      email: String,
      username: String,
      password: String,
      user_type: String
    });
  
    var User = mongoose.model("User", userSchema);  
    zapp.post("/register-user", function (req, res) {
      // get data from the view and add it to mongodb
      User.find({ email: req.body.email }, function (err, data) {
        if (err) throw err;
        if (data.length) {
          return res.status(200).send({ message: 'Email or username already exist' });
        }
        req.body.password = Helper.hashPassword(req.body.password);
        User(req.body).save(function (err, data) {
          if (err) throw err;
          const info = {
            token: Helper.generateToken(req.body.username),
            username: req.body.username,
            email: req.body.email,
            user_type: req.body.user_type
          }
          return res.status(200).send(info);
        });
      });
    });
  
    zapp.delete("/delete-user", function (req, res) {
      // delete requested item from mongodb
      User.find({ _id: req.params.item }).remove(function (err, data) {
        if (err) throw err;
        res.send(data);
      });
    });
    zapp.post("/check-user", function (req, res) {
      // delete requested item from mongodb
      User.find({ email: req.body.email }, function (err, data) {
        if (err) throw err;
        res.send(data);
      });
    });
    //log in
    zapp.post("/login", function (req, res) {
      User.find({ email: req.body.email }, function (err, data) {
        if (err) throw err;
        if (!data.length) {
          return res.status(200).send({ message: 'Username or Password is Wrong' });
        }
        if (!Helper.comparePassword(data[0].password, req.body.password)) {
          return res.status(200).send({ message: 'Username or Password is Wrong' });
        }
        const info = {
          token: Helper.generateToken(data[0].username),
          username: data[0].username,
          email: data[0].email,
          user_type: data[0].user_type,
          user_id: data[0]._id
        }
        return res.status(200).send(info);
      });
    });
    //update
    zapp.post("/update-user", function (req, res) {
      // get data from the view and add it to mongodb
      User.update(
        { email: req.body.email },
        req.body,
        { multi: false },
        function (err, data) {
          if (err) throw err;
          res.send(data);
        }
      );
    });
  };
  