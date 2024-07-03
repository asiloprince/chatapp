const bcrypt = require("bcrypt");

const passwordUtl = {
  matchPassword: async function (enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  },

  hashPassword: async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  },
};

module.exports = passwordUtl;
