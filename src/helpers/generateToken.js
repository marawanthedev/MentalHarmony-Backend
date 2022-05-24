const jwt = require("jsonwebtoken");

generateToken = (id) => {
  //   tokens will include the user id which might be used in making rest calls
  // while keeping the users data secure and un visible
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { generateToken };
