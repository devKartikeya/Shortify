const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require("cookie-parser");
const urlRouter = require("./urls/urls.route");
const userRouter = require("./users/users.route");
const emailRouter = require("./email/email.route");
const corsOptions = require("./configurations/cors");
const rateLimiter = require("./configurations/rate-limiter");
const { redirectUrlController } = require("./urls/urls.controller");

const app = express();

app.use(corsOptions); /* Apply CORS configuration to all routes */
// app.use(rateLimiter); /* Apply rate limiting to all routes */
app.use(express.urlencoded({ extended: true })); /* Parse incoming URL-encoded requests */
app.use(express.json()); /* Parse incoming JSON requests */
app.use(cookieParser()); /* Parse cookies from incoming requests */

// 1. Create a write stream in append mode ('a' flag)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

// 2. Setup morgan to write to the log stream
app.use(morgan('combined', { stream: accessLogStream }));

/* Health Check Endpoint */
app.get("/health", (req, res) => {
  res.status(200).json({
    "status": "UP"
  })
});

/* Mount Routers */
app.use("/users", userRouter);
app.use("/urls", urlRouter);
app.use("/email", emailRouter);

/* Redirect Endpoint */
app.get("/:shortCode", redirectUrlController);

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

module.exports = app;