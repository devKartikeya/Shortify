const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const userRouter = require("./users/users.route");
const urlRouter = require("./urls/urls.route");

const {
    redirectUrlController
} = require("./urls/urls.controller");


app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());''

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