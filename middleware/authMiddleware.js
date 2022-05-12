const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { header } = require("express/lib/request");

//middle wares have next
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //   tokens start with bearer in auth object within req header
  console.log(req);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];
      //   VERIYIFING THE TOKEN
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //   getting user from token
      // assinging the user to req user so we can access in protected routes
      req.user = await User.findById(decoded.id).select("-password");

      //   .select does not include a certain field  which might not be needed or prefereed to be hidden for security reasons
      //   User.findById(decoded.id).select("-password");

      //calling the controller function to comm with db
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  }
  // in case of not having a token
  if (!token) {
    res.status(401);
    throw new Error("not authorized, no token");
  }
});
module.exports = {
  protect,
};
