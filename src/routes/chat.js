const express = require("express");
const {
  accessChat,
  fetchChat,
  createGroup,
  leaveGroup,
  updateGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const route = express.Router();

route.post("/", protect, accessChat);
route.get("/", protect, fetchChat);
route.post("/group", protect, createGroup);
route.delete("/group/:chatId/user/:userId", protect, leaveGroup);
route.patch("/group/:id", protect, updateGroup);

module.exports = route;
