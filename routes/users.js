const express    = require("express");
const Router     = express.Router();
const DB         = require("../connection");
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

Router.get("/", (req, res) => {
  const { have_service } = req.body;
  let queryStr = "select u.*, s.* from users as u left join users_to_services as us on u.id = us.user_id left join services as s on s.id = us.service_id";

  if (have_service) {
    queryStr =
      "select u.*, s.* from users as u join users_to_services as us on u.id = us.user_id join services as s on s.id = us.service_id";
  } else {
    queryStr =
      "select u.*, s.* from users as u left join users_to_services as us on u.id = us.user_id left join services as s on s.id = us.service_id";
  }

  DB.query(queryStr, (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

Router.post('/auth', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (username && password) {
    DB.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.send('Loged in');
      } else {
        res.send('Incorrect Username and/or Password!');
      }
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});

Router.post("/", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { firstName, lastName, email, username, password } = req.body;
  console.log("TCL: req.body", req.query);
  DB.query(
    "INSERT INTO users (firstName, lastName, email, username, password) VALUES (?,?,?,?,?)",
    [firstName, lastName, email, username, password],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

Router.put("/:id", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  const { firstName } = req.body;
  const id = req.params.id;
  DB.query(
    "UPDATE users SET firstName=? WHERE id=?",
    [firstName, id],
    function(err, result) {
      if (err) return console.log(err);
      res.send(result);
    }
  );
});

Router.delete("/:id", function(req, res) {
  const id = req.params.id;
  DB.query("DELETE FROM users WHERE id=?", [id], function(err, result) {
    if (res)
      DB.query(
        "DELETE FROM users_to_services WHERE user_id=?",
        [id],
        function(err, result) {
          res.send(result);
        }
      );
    res.send(result);
  });
});

module.exports = Router;
