const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const mongoose = require("mongoose");

const fetchAllMessage = async (req, res, next) => {
  if (!req.params.chatId) {
    res.status(400);
    next("ChatId is not exists");
  }

  try {
    const messages = await Message.find({
      "chat._id": mongoose.Types.ObjectId(req.params.chatId),
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  if (!req.body.content || !req.body.chatId) {
    res.status(400);
    next("please fill in");
  }

  try {
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
  } catch (error) {
    console.log(error);
    res.status(400);
    next(error);
  }
};

module.exports = { sendMessage, fetchAllMessage };
