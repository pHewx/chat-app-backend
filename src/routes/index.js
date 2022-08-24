const userRoute = require("./user");
const chatRoute = require("./chat");
const messageRoute = require("./message");
const { notFound, errorHandler } = require("../middleware/errorMiddleware");

function routes(app) {
  app.use("/api/user", userRoute);
  app.use("/api/chat", chatRoute);
  app.use("/api/message", messageRoute);

  // handle error
  app.use(notFound);
  app.use(errorHandler);
}

module.exports = routes;
