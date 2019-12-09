const express = require("express");
const Router = express.Router();
const pool = require("../connection");
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

Router.get("/", (req, res) => {
  pool.query("SELECT *from services", (err, rows, fields) => {
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
  pool.query(
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
  pool.query(
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
  pool.query("DELETE FROM services WHERE id=?", [id], function(err, result) {
    res.send(result);
  });
});

module.exports = Router;
