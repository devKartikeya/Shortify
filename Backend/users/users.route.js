const express = require("express");

const {
    userRegisterController,
    userLoginController,
    getCurrentUserController,
    deleteUserController,
    changePasswordController,
    logoutUserController,
    updateProfileController,
    forgotPasswordController
} = require("./users.controller");

const authMiddleware = require("../middleware/authentication.middleware");

const router = express.Router();

router.post("/register", userRegisterController);

router.post("/login", userLoginController);

router.get("/me", authMiddleware, getCurrentUserController);

router.delete("/delete", authMiddleware, deleteUserController);

router.patch("/change-password", authMiddleware, changePasswordController);

router.post("/logout", authMiddleware, logoutUserController);

router.patch("/profile", authMiddleware, updateProfileController);

router.post("/forgot-password", forgotPasswordController);

module.exports = router;