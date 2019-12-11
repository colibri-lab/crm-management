const mysql = require("mysql2");

// mysql --host=us-cdbr-iron-east-05.cleardb.net --user=b29064450352db --password=d2f8acf6 --reconnect heroku_93409708d599b92

const connection = mysql.createPool({
  connectionLimit: 5,
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b29064450352db",
  database: "heroku_93409708d599b92",
  password: "d2f8acf6",
  multipleStatements: true
});

// const connection = mysql.createPool({
//   connectionLimit: 5,
//   host: "localhost",
//   user: "root",
//   database: "test",
//   password: "",
//   multipleStatements: true
// });

module.exports = connection;
