const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res, next) => {
  var { userId } = req.body;

  if (!userId) {
    console.log("UserID param not sent with request");
    return res.sendStatus(400);
  }

  const user = await User.findById({ _id: userId });

  const chat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { _id: { $eq: req.user._id } } } },
      { users: { $elemMatch: { _id: { $eq: user._id } } } },
    ],
  });

  if (chat.length > 0) {
    res.status(200).json(chat[0]);
  } else {
    const chatData = {
      chatName: "sender",
    };

    const createdChat = await new Chat(chatData);
    await createdChat.users.push(user);
    await createdChat.users.push(req.user);
    await createdChat.save();
    res.status(200).json(createdChat);
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChat = asyncHandler(async (req, res, next) => {
  const chats = await Chat.find({
    users: { $elemMatch: { _id: req.user._id } },
  }).sort({ updatedAt: -1 });
  res.status(200).json(chats);
});

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroup = asyncHandler(async (req, res, next) => {
  if (!req.body.name || !req.body.users) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
  }

  var users = JSON.parse(req.body.users);

  users = users.map((user) => {
    user._id = mongoose.Types.ObjectId(user._id);
    return user;
  });

  const chatName = req.body.name;

  if (users.length < 2) {
    res.status(400);
    throw new Error("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  const groupChat = await new Chat({
    chatName: chatName,
    isGroupChat: true,
    users: users,
    groupAdmin: req.user,
  });

  await groupChat.save();
  res.json(groupChat);
});

//@description     Leave Group Chat
//@route           Delete /api/chat/group/:chatId/user/:userId
//@access          Protected
const leaveGroup = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: { _id: req.user._id } } },
    {
      new: true,
    }
  );

  if (removed) {
    removed.groupAdmin = removed.users[0];
    await removed.save();
    res.status(200).json(removed);
  } else {
    res.status(400);
    throw new Error("userId or chatId not found");
  }
});

//@description     Update Group Chat
//@route           PATCH /api/chat/group/:id
//@access          Protected
const updateGroup = asyncHandler(async (req, res) => {
  var { name, users } = req.body;
  const chatId = req.params.id;

  if (req.user._id != chatId.groupAdmin._id) {
    res.status(400);
    throw new Error("Only admin can edit group");
  }

  if (!name || !users) {
    res.status(400);
    throw new Error("Please fill in");
  }

  users = JSON.parse(users);

  users = users.map((user) => {
    user._id = mongoose.Types.ObjectId(user._id);
    return user;
  });

  const updated = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: name,
      users: users,
    },
    { new: true }
  );

  if (updated) {
    await updated.save();

    res.status(200).json(updated);
  } else {
    res.status(400);
    throw new Error("ChatId not found");
  }
});

module.exports = {
  accessChat,
  fetchChat,
  createGroup,
  leaveGroup,
  updateGroup,
};
