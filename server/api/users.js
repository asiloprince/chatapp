const express = require("express");
const {
  registerUsersHandler,
  authLoginUserHandler,
  getAllUsers,
  logOutUser,
} = require("../handler/users.handler");
const validateAuthCookie = require("../global/middleware/authorization.middleware");

const router = express.Router();

router
  .route("/")
  .post(registerUsersHandler)
  .get(validateAuthCookie, getAllUsers);
router.post("/login", authLoginUserHandler);
router.post("/logout", logOutUser);

module.exports = router;
