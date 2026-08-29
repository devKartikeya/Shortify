const express = require("express");

const {
    userRegisterController,
    userLoginController,
    getCurrentUserController
} = require("./users.controller");

const authMiddleware = require("../middleware/authentication.middleware");

const router = express.Router();

router.post("/register", userRegisterController);

router.post("/login", userLoginController);

router.get("/me", authMiddleware, getCurrentUserController);


module.exports = router;