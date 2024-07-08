const express = require("express");
const validateAuthCookie = require("../global/middleware/authorization.middleware");
const { handleIsUserAuth } = require("../handler/users.handler");

const router = express.Router();

router.get("/", validateAuthCookie, handleIsUserAuth);

module.exports = router;
