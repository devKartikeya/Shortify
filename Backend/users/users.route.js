const express = require("express");

const {
    userRegisterController,
    userLoginController,
    getCurrentUserController,
    deleteUserController,
    changePasswordController,
} = require("./users.controller");

const authMiddleware = require("../middleware/authentication.middleware");

const router = express.Router();

router.post("/register", userRegisterController);

router.post("/login", userLoginController);

router.get("/me", authMiddleware, getCurrentUserController);

router.delete("/delete", authMiddleware, deleteUserController);

router.patch("/change-password", authMiddleware, changePasswordController);

module.exports = router;