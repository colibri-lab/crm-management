const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require("cors");

const UsersRoutes = require("./routes/users");
const ServicesRoutes = require("./routes/services");
const TypesRoutes = require("./routes/user_types");

const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/users", UsersRoutes);
app.use("/services", ServicesRoutes);
app.use("/services", TypesRoutes);
// console.log(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("You're connected to server ... http://localhost:" + PORT);
});
