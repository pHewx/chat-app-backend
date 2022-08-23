const userRoute = require("./user");
const chatRoute = require("./chat");
const messageRoute = require("./message");

function routes(app) {
  app.use("/user", userRoute);
  app.use("/chat", chatRoute);
  app.use("/message", messageRoute);
}

module.exports = routes;
