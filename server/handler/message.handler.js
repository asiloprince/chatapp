const asyncHandler = require("../global/middleware/async.handler.middleware");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModels");

const addMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data request");
    return res.send(400);
  }
  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name, profile_img");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name profile_img email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      recentMessage: message,
    });

    res.json(message);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = { addMessage };
