const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: Object,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    chat: {
      type: Object,
    },
    readBy: {
      type: mongoose.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
