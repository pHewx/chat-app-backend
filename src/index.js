const express = require("express");
const dotenv = require("dotenv");
const app = express();
const db = require("./configs/db");
const routes = require("./routes");
const cors = require("cors");

// Config
dotenv.config();
db.connect();

app.use(express.json());
app.use(cors());

// Routes
routes(app);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log("listen on port " + PORT);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    credentials: true,
    origin: "https://chat-app-fake.netlify.app",
  },
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("setup", (userId) => {
    socket.join(userId);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room : " + room);
  });

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!newMessageReceived.chat.users) console.log("users not found");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.to(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("typing", (room) => {
    console.log("typing");

    socket.to(room._id).emit("typing", room._id);
  });

  socket.on("stop typing", (room) => {
    socket.to(room._id).emit("stop typing", room._id);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userId);
  });
});
