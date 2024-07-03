const express = require("express");
const {
  registerUsersHandler,
  authLoginUserHandler,
} = require("../handler/users.handler");

const router = express.Router();

router.route("/").post(registerUsersHandler).get();
router.post("/login", authLoginUserHandler);

module.exports = router;
