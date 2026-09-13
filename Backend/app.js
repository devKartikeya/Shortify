const express = require('express');
const cookieParser = require("cookie-parser");
const urlRouter = require("./urls/urls.route");
const userRouter = require("./users/users.route");
const corsOptions = require("./configurations/cors");
const rateLimiter = require("./configurations/rate-limiter");
const { redirectUrlController } = require("./urls/urls.controller");

const app = express();

app.use(corsOptions);
app.use(rateLimiter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    "status": "UP"
  })
});

app.use("/users", userRouter);
app.use("/urls", urlRouter);

app.get("/:shortCode", redirectUrlController);

app.get('/', (req, res) => {
  res.send('Hello from Express backend 2!');
});

module.exports = app;