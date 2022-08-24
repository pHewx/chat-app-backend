const express = require("express");
const fileUploader = require("../configs/cloudinary.config");
const {
  registerUser,
  getAllUser,
  loginUser,
  uploadUserImage,
} = require("../controllers/userControllers");
const route = express.Router();

route.post("/login", loginUser);
route.get("/", getAllUser);
route.post("/", registerUser);
route.post("/cloudinary-upload", fileUploader.single("file"), uploadUserImage);

module.exports = route;
