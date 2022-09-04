const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  sendMessage,
  fetchAllMessage,
} = require("../controllers/messageController");

const route = express.Router();

route.get("/:chatId", protect, fetchAllMessage);
route.post("/", protect, sendMessage);

module.exports = route;
