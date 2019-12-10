const express    = require("express");
const Router     = express.Router();
const DB         = require("../connection");
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

Router.get("/", (req, res) => {
  DB.query("SELECT *from user_types", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});
Router.post("/", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const { name } = req.body;
  DB.query(
    "INSERT INTO types (name) VALUES (?)",
    [name],
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
    "UPDATE user_types SET type=? WHERE id=?",
    [firstName, id],
    function(err, result) {
      if (err) return console.log(err);
      res.send(result);
    }
  );
});

Router.delete("/:id", function(req, res) {
  const id = req.params.id;
  DB.query("DELETE FROM user_types WHERE id=?", [id], function(err, result) {
    res.send(result);
    console.log("TCL: result", result);
  });
});

module.exports = Router;
