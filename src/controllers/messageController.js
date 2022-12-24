const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const fetchAllMessage = asyncHandler(async (req, res, next) => {
  if (!req.params.chatId) {
    res.status(400);
    throw new Error("ChatId is not exists");
  }

  const messages = await Message.find({
    "chat._id": mongoose.Types.ObjectId(req.params.chatId),
  });

  res.status(200).json(messages);
});

const sendMessage = asyncHandler(async (req, res, next) => {
  if (!req.body.content || !req.body.chatId) {
    res.status(400);
    throw new Error("Please fill in");
  }

  const chat = await Chat.findById(req.body.chatId);

  const message = await Message.create({
    sender: req.user,
    content: req.body.content,
    chat,
  });

  await Chat.updateOne(
    { _id: req.body.chatId },
    { latestMessage: { sender: message.sender, content: message.content } }
  );

  res.status(200).json(message);
});

module.exports = { sendMessage, fetchAllMessage };
