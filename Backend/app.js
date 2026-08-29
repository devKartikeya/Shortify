const express = require('express');
const cors = require("cors");
const connectDB = require('./configurations/database');
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require("./users/users.route");
const urlRouter = require("./urls/urls.route");
const {
    redirectUrlController
} = require("./urls/urls.controller");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/users", userRouter);
app.use("/urls", urlRouter);

app.get(
    "/:shortCode",
    redirectUrlController
);

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:PORT`);
});