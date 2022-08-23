const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  res.json("login");
});

route.get("/register", (req, res) => {
  res.json("register");
});

module.exports = route;
