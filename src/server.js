const express = require("express");
const dotenv = require("dotenv");
const app = express();
const db = require("../src/config/db");

// Config
dotenv.config();
db.connect();

app.get("/", (req, res) => {
  res.json("helloo");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("listen on port " + PORT);
});
