const path = require("path");
const express = require("express");
require("./database");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();
const server = app.listen(3000);
module.exports = {
  server,
  app,
};
var ari = require('ari-client');
var util = require('util');
const {clientLoaded }= require('./asterisk/index')
ari.connect('http://192.168.1.12:8088', 'asterisk', 'asterisk', clientLoaded);

app.use(cookieParser());
require("./config/jwt.config");
require("./config/socket.config");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);