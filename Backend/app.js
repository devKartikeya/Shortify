const morgan = require('morgan');
const express = require('express');
const cookieParser = require("cookie-parser");
const urlRouter = require("./urls/urls.route");
const userRouter = require("./users/users.route");
const emailRouter = require("./email/email.route");
const corsOptions = require("./configurations/cors");
const helmetConfig = require("./configurations/helmet");
const accessLogStream = require("./configurations/logs");
// const rateLimiter = require("./configurations/rate-limiter");
const { redirectUrlController } = require("./urls/urls.controller");

const app = express();

app.use(corsOptions); /* Apply CORS configuration to all routes */
// app.use(rateLimiter); /* Apply rate limiting to all routes */
app.use(express.urlencoded({ extended: true })); /* Parse incoming URL-encoded requests */
app.use(express.json()); /* Parse incoming JSON requests */
app.use(cookieParser()); /* Parse cookies from incoming requests */
app.use(helmetConfig); /* Apply Helmet security headers */
// app.use(morgan('combined', { stream: accessLogStream })); /* Log HTTP requests using Morgan and write to rotating log files */

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

// setInterval(cron, 1800000); /* Run the cron job every 30 minutes */

module.exports = app;