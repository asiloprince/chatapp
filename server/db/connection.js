const mongoose = require("mongoose");

const DB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI);
    console.log(`MongoDB is connected to: ${conn.connection.host}`);
  } catch (err) {
    console.log(`error: ${err.message}`);
    process.exit(1);
  }
};
module.exports = DB;
