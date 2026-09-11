const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");
const redisClient = require("./configurations/redis");
const { redirectUrlController } = require("./urls/urls.controller");

const app = express();

const userRouter = require("./users/users.route");
const urlRouter = require("./urls/urls.route");

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: "Too many requests, try later on !",
  statusCode: 429
});

app.use(
  cors({
    origin: "http://localhost:8080",
    origin: "http://localhost:5173",
    credentials: true
  })
);

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
  res.send('Hello from Express backend!');
});


module.exports = app;