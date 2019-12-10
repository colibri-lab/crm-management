const bodyParser = require("body-parser");
const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// mysql --host=us-cdbr-iron-east-05.cleardb.net --user=b29064450352db --password=d2f8acf6 --reconnect heroku_93409708d599b92

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b29064450352db",
  database: "heroku_93409708d599b92",
  password: "d2f8acf6",
  multipleStatements: true
});

/*const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "crm",
  password: "123456",
  multipleStatements: true
});*/
const app = express();
app.use(cors());

// получение списка пользователей
app.get("/", function(req, res) {
  pool.query("SELECT * FROM users", function(err, data) {
    if (err) return console.log(err);
  });
});

// получем id редактируемого пользователя, получаем его из бд и отправлям с формой редактирования
app.get("/edit/:id", function(req, res) {
  const id = req.params.id;
  pool.query("SELECT * FROM users WHERE id=?", [id], function(err, data) {
    if (err) return console.log(err);
    res.render("edit.hbs", {
      dataTable: data[0]
    });
  });
});
// получаем отредактированные данные и отправляем их в БД
app.post("/edit", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const id = req.body.id;

  pool.query(
    "UPDATE users SET firstName=?, lastName=? email=? WHERE id=?",
    [firstName, lastName, email, id],
    function(err, data) {
      if (err) return console.log(err);
      res.redirect("/");
    }
  );
});

// получаем id удаляемого пользователя и удаляем его из бд
app.post("/delete/:id", function(req, res) {
  const id = req.params.id;
  pool.query("DELETE FROM users WHERE id=?", [id], function(err, data) {
    if (err) return console.log(err);
    res.redirect("/");
  });
});

module.exports = pool;
