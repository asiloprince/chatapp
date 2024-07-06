const jwt = require("jsonwebtoken");
const asyncHandler = require("./async.handler.middleware");
const User = require("../../models/userModel");

const validateAuthCookie = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (err) {
      res.status(401);
      console.log(err);
      throw new Error("Token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized!");
  }
});
module.exports = validateAuthCookie;
