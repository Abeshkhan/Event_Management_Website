const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./controller");

const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "FE#5-GE",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  res.append("Accept", "application/json");
  next();
});

app.set("view engine", "ejs");

//Routing
routes.map((route) => app.use(route));

// server start
module.exports = app;
