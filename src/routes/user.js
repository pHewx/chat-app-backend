const express = require("express");
const {
  registerUser,
  getAllUser,
  authUser,
} = require("../controllers/userControllers");
const route = express.Router();

route.post("/login", authUser);
route.get("/", getAllUser);
route.post("/", registerUser);

module.exports = route;
