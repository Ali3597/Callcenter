const path = require("path");
require("dotenv").config();
const express = require("express");
require("./database");

const router = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();

const server = app.listen(process.env.PORTAPP);

module.exports = {
  server,
  app,
};

app.use(cookieParser());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWFRONT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
require("./config/jwt.config");
require("./config/socket.config");

require("./config/asterisk.config");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
