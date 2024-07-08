const express = require("express");
const validateAuthCookie = require("../global/middleware/authorization.middleware");
const { addMessage } = require("../handler/message.handler");

const router = express.Router();

router.route("/").post(validateAuthCookie, addMessage);
// router.route('/:chatId').get(validateAuthCookie)
module.exports = router;
