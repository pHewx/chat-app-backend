const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = require("./userModel").schema;

const chatSchema = new Schema(
  {
    chatName: {
      type: String,
      required: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [{ type: Object }],
    latestMessage: {
      type: Object,
    },
    groupAdmin: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
