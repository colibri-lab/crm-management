const express = require("express");
const Router = express.Router();
const DB = require("../connection");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0//", salt);

const saltRounds = 10;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const TABLE = "users";

// function checkUser(username, password) {
//   console.log("tets1");
//   DB.query(
//     "SELECT * FROM " + TABLE + " WHERE username = ?",
//     [username],
//     function(error, results, fields) {
//       console.log("tets2");
//       if (results.length > 0) {
//         console.log("TCL: checkUser -> results.length", results.length);
//         console.log("tets3");
//         bcrypt.compareSync(password, results[0].password, function(
//           err,
//           result
//         ) {
//           console.log(
//             "TCL: checkUser -> results[0].password",
//             results[0].password
//           );
//           console.log("TCL: checkUser -> password", password);
//           console.log("TCL: checkUser -> result", result);
//           console.log("tets4");
//           return result;
//         });
//       } else {
//         return false;
//       }
//     }
//   );
// }

Router.get("/", (req, res) => {
  const { have_service } = req.body;
  let queryStr =
    "select u.*, s.* from " +
    TABLE +
    " as u left join users_to_services as us on u.id = us.user_id left join services as s on s.id = us.service_id";

  if (have_service) {
    queryStr =
      "select u.*, s.* from " +
      TABLE +
      " as u join users_to_services as us on u.id = us.user_id join services as s on s.id = us.service_id";
  } else {
    queryStr =
      "select u.*, s.* from " +
      TABLE +
      " as u left join users_to_services as us on u.id = us.user_id left join services as s on s.id = us.service_id";
  }

  DB.query(queryStr, (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// Router.post("/login", function(req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   //   const password = bcrypt.hashSync(req.body.password, 10);
//   console.log("TCL: username", username);
//   console.log("TCL: password", password);

//   if (username && password) {
//     console.log("tets5");
//     let a = checkUser(username, password);
//     console.log("a", a);
//     if (a) {
//       console.log("tets6");
//       req.session.loggedIn = true;
//       req.session.username = username;
//       res.send({ error: false, message: "Logged in" });
//     } else {
//       res.send({ error: true });
//     }
//   } else {
//     res.send({ error: true, message: "Please enter Username and Password!" });
//     res.end();
//   }
// });
Router.post("/login", function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  DB.query(
    "SELECT * FROM " + TABLE + " WHERE username = ? ",
    [username],
    function(error, results, fields) {
      if (results[0].password) {
        bcrypt.compare(req.body.password, results[0].password, function(
          err,
          result
        ) {
          console.log(">>>>>> ", password);
          console.log(">>>>>> ", results[0].password);
          if (result) {
            return res.send();
          } else {
            return res.status(400).send();
          }
        });
      }
    }
  );
});

Router.post("/", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { firstName, lastName, email, username, password } = req.body;

  if (!checkUser(username, password)) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        DB.query(
          "INSERT INTO " +
            TABLE +
            " (firstName, lastName, email, username, password) VALUES (?,?,?,?,?)",
          [firstName, lastName, email, username, hash],
          (err, rows, fields) => {
            if (!err) {
              res.send(rows);
            } else {
              console.log(err);
            }

            res.end();
          }
        );
      });
    });
  } else {
    res.send({
      error: true,
      message: "there is user with same username or password"
    });
  }
});

Router.put("/:id", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  const { firstName } = req.body;
  const id = req.params.id;

  DB.query(
    "UPDATE " + TABLE + " SET firstName=? WHERE id=?",
    [firstName, id],
    function(err, result) {
      if (err) return console.log(err);
      res.send(result);
    }
  );
});

Router.delete("/:id", function(req, res) {
  const id = req.params.id;

  DB.query("DELETE FROM " + TABLE + " WHERE id=?", [id], function(err, result) {
    if (res)
      DB.query("DELETE FROM users_to_services WHERE user_id=?", [id], function(
        err,
        result
      ) {
        res.send(result);
      });

    res.send(result);
  });
});

module.exports = Router;
