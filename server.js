const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

const UsersRoutes = require("./routes/users");
const ServicesRoutes = require("./routes/services");
const TypesRoutes = require("./routes/user_types");

const app = express();
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/users", UsersRoutes);
app.use("/users/login", UsersRoutes);
app.use("/services", ServicesRoutes);
app.use("/services", TypesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("You're connected to server ... http://localhost:" + PORT);
});
