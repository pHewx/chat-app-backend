const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  res.json("chats");
});

module.exports = route;
