const mongoose = require("mongooses");
const { Schema } = mongoose;

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
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
