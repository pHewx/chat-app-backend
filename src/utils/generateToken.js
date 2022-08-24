var jwt = require("jsonwebtoken");
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

module.exports = generateToken;
