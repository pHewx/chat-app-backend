const mongoose = require("mongoose");

const db = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("CONNECT MONGODB SUCCESS");
    } catch (error) {
      console.log("ERROR: " + error);
    }
  },
};

module.exports = db;
