const express = require("express");
const dotenv = require("dotenv");

const app = express();

// CONFIGURATIONS
const env_path = `./.env.${process.env.NODE_ENV}`;
dotenv.config({ path: env_path });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.set("Access-Control-Allow-Credentials", true);
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT , DELETE");

  next();
});

app.get("/", (req, res) => {
  res.send("Chat app with chat kita");
});

app.listen(process.env.PORT, () =>
  console.log(`App is listening to server ${process.env.PORT}`)
);
