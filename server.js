const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const UsersRoutes = require("./routes/users");
const ServicesRoutes = require("./routes/services");
const TypesRoutes = require("./routes/user_types");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/users", UsersRoutes);
app.use("/services", ServicesRoutes);
app.use("/services", TypesRoutes);
console.log(app);

app.listen(3008, function() {
  console.log("Сервер ожидает подключения...");
});
