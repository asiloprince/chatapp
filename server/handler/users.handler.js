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
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_img: user.profile_img,
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
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile_img: user.profile_img,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user_id } });

  res.send(users);
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const handleIsUserAuth = asyncHandler(async (req, res) => {
  res.send({
    success: true,
    message: "You're now Authorized",
    isAuth: true,
    user: req.user,
  });
});

module.exports = {
  registerUsersHandler,
  authLoginUserHandler,
  getAllUsers,
  logOutUser,
  handleIsUserAuth,
};
