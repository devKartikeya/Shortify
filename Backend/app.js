const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const redisClient = require("./configurations/redis");

const app = express();

const userRouter = require("./users/users.route");
const urlRouter = require("./urls/urls.route");

const { redirectUrlController } = require("./urls/urls.controller");


app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/redis-test", async (req, res) => {
  await redisClient.set("name", "Kartikeya");

  const name = await redisClient.get("name");

  res.json({
    message: "Redis is working!",
    name
  });
});

app.use("/users", userRouter);
app.use("/urls", urlRouter);

app.get(
  "/:shortCode",
  redirectUrlController
);

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

module.exports = app;