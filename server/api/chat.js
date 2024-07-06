const express = require("express");
const validateAuthCookie = require("../global/middleware/authorization.middleware");
const {
  createChats,
  userChats,
  createGroupChat,
  addGroupChatMember,
  updateGroupChats,
  removeGroupChatMember,
} = require("../handler/chats.handler");

const router = express.Router();

router.route("/").post(validateAuthCookie, createChats);
router.route("/").get(validateAuthCookie, userChats);

router.route("/group").post(validateAuthCookie, createGroupChat);
router.route("/add").post(validateAuthCookie, addGroupChatMember);
router.route("/update").put(validateAuthCookie, updateGroupChats);
router.route("/remove").put(validateAuthCookie, removeGroupChatMember);
module.exports = router;
