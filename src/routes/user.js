const express = require("express");
const fileUploader = require("../configs/cloudinary.config");
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  getAllUser,
  loginUser,
  uploadUserImage,
  getUserById,
} = require("../controllers/userControllers");
const route = express.Router();

route.post("/login", loginUser);
route.get("/", protect, getAllUser);
route.get("/:id", getUserById);
route.post("/", registerUser);
route.post("/cloudinary-upload", fileUploader.single("file"), uploadUserImage);

module.exports = route;
