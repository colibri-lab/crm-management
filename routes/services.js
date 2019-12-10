const express    = require("express");
const Router     = express.Router();
const DB         = require("../connection");
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

Router.get("/", (req, res) => {
  DB.query("SELECT *from services", (err, rows, fields) => {
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
    "INSERT INTO services (name) VALUES (?)",
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
    "UPDATE services SET firstName=? WHERE id=?",
    [firstName, id],
    function(err, result) {
      if (err) return console.log(err);
      res.send(result);
    }
  );
});

Router.delete("/:id", function(req, res) {
  const id = req.params.id;
  DB.query("DELETE FROM services WHERE id=?", [id], function(err, result) {
    res.send(result);
  });
});

module.exports = Router;
