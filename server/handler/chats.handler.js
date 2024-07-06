const asyncHandler = require("../global/middleware/async.handler.middleware");
const Chat = require("../models/chatModels");
const User = require("../models/userModel");

const createChats = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId param request error");
    return res.status(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("recentMessage");

  isChat = await User.populate(isChat, {
    path: "recentMessage.sender",
    select: "name profile_img email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");

      res.status(200).send(FullChat);
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
});

const userChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("recentMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "recentMessage.sender",
          select: "name profile_img email",
        });

        res.status(200).send(results);
      });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please fill all required fields" });
  }

  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send("Please select a group member");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const groupChatMembers = await Chat.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(groupChatMembers);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const addGroupChatMember = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const addMember = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addMember) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(addMember);
  }
});

const updateGroupChats = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updateInfo = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateInfo) {
    res.status(404);
    throw new Error("Chat not Found");
  } else {
    res.json(updateInfo);
  }
});

const removeGroupChatMember = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removeMember = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removeMember) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removeMember);
  }
});

module.exports = {
  createChats,
  userChats,
  createGroupChat,
  addGroupChatMember,
  updateGroupChats,
  removeGroupChatMember,
};
