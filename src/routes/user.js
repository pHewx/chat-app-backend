const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  getAllUser,
  loginUser,
  getUserById,
} = require("../controllers/userControllers");
const route = express.Router();

route.post("/login", loginUser);
route.get("/", protect, getAllUser);
route.get("/:id", getUserById);
route.post("/", registerUser);

module.exports = route;
