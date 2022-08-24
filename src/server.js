const express = require("express");
const dotenv = require("dotenv");
const app = express();
const db = require("../src/config/db");
const routes = require("./routes");

// Config
dotenv.config();
db.connect();

app.use(express.json());

// Routes
routes(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("listen on port " + PORT);
});
