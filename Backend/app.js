const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const rfs = require('rotating-file-stream');
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

// Create a rotating write stream
const pad = (num) => (num > 9 ? "" : "0") + num;

const generator = (time, index) => {
  if (!time) return "access.log";

  const month =
    time.getFullYear() + "" + pad(time.getMonth() + 1);

  const day = pad(time.getDate());
  const logDirectory = path.join(
    __dirname,
    "logs",
    month
  );
  // Create monthly directory if it doesn't exist
  fs.mkdirSync(logDirectory, {
    recursive: true
  });
  return `${month}/${month}${day}-${index}-access.log`;
};

const accessLogStream = rfs.createStream(generator, {
  interval: '1d', // Rotate daily
  path: path.join(__dirname, 'logs'), // Directory to store log files
  maxFiles: 30, // Keep logs for the last 30 days
  compress: 'gzip', // Compress rotated files
  size: '1K', // Rotate when the file size exceeds 1KB
});

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