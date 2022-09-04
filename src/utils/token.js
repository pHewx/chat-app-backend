var jwt = require("jsonwebtoken");

const token = {
  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  },
  decodeToken(id) {
    return jwt.verify(id, process.env.JWT_SECRET);
  },
};

module.exports = token;
