const express = require('express');
const cookieParser = require("cookie-parser");
const urlRouter = require("./urls/urls.route");
const userRouter = require("./users/users.route");
const corsOptions = require("./configurations/cors");
const redisClient = require("./configurations/redis");
const rateLimiter = require("./configurations/rate-limiter");
const { redirectUrlController } = require("./urls/urls.controller");

const app = express();

app.use(corsOptions);
app.use(rateLimiter);
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
  res.send('Hello from Express backend 2!');
});


module.exports = app;