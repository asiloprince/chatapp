const express = require("express");
const validateAuthCookie = require("../global/middleware/authorization.middleware");
const { addMessage, userMessage } = require("../handler/message.handler");

const router = express.Router();

router.route("/").post(validateAuthCookie, addMessage);
router.route("/:chatId").get(validateAuthCookie, userMessage);

module.exports = router;
