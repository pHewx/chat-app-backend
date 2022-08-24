const express = require("express");
const dotenv = require("dotenv");
const app = express();
const db = require("./configs/db");
const routes = require("./routes");
const cors = require("cors");

// Config
dotenv.config();
db.connect();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());

// Routes
routes(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("listen on port " + PORT);
});
