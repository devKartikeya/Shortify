const express = require("express");

const {
    userRegisterController,
    userLoginController
} = require("./users.controller");

const router = express.Router();

router.post("/register", userRegisterController);

router.post("/login", userLoginController);

module.exports = router;