const express = require("express");
const dotenv = require("dotenv");
const DB = require("./db/connection");
const cookieParser = require("cookie-parser");
const userApi = require("./api/users");
const authApi = require("./api/auth");
const chatApi = require("./api/chat");
const messageApi = require("./api/message");
const errorMiddleware = require("./global/middleware/error.middleware");

const app = express();

// CONFIGURATIONS
const env_path = `./.env.${process.env.NODE_ENV}`;
dotenv.config({ path: env_path });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.set("Access-Control-Allow-Credentials", true);
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT , DELETE");

  next();
});
DB();

app.get("/", (req, res) => {
  res.send("Chat app with chat kita");
});
app.use("/api/user", userApi);
app.use("/api/auth", authApi);
app.use("/api/chat", chatApi);
app.use("/api/message", messageApi);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

console.log(`Environment: ${process.env.NODE_ENV.toUpperCase()}`);

app.listen(process.env.PORT, () =>
  console.log(`App is listening to server ${process.env.PORT}`)
);
