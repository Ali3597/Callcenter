const path = require("path");
const express = require("express");
require("./database");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();
const server = app.listen(4000);

module.exports = {
  server,
  app,
};

app.use(cookieParser());
require("./config/jwt.config");
require("./config/socket.config");

// require("./config/asterisk.config")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
