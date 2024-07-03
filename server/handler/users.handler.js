const asyncHandler = require("../global/middleware/async.handler.middleware");
const generateToken = require("../global/utils/jwt.utils");
const passwordUtl = require("../global/utils/password.utils");
const User = require("../models/userModel");

const registerUsersHandler = asyncHandler(async (req, res) => {
  const { name, email, password, profile_img } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  try {
    const hashedPassword = await passwordUtl.hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profile_img,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_img: user.profile_img,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the user");
    }
  } catch (err) {
    res.status(500).json({ err: "an error occured" });
  }
});

const authLoginUserHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await passwordUtl.matchPassword(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile_img: user.profile_img,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUsersHandler, authLoginUserHandler };
