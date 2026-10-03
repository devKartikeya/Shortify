const express = require("express");

const {
    userRegisterController,
    userLoginController,
    getCurrentUserController,
    deleteUserController,
    changePasswordController,
    logoutUserController,
    updateProfileController,
    forgotPasswordController,
    resetPasswordController
} = require("./users.controller");

const authMiddleware = require("../middleware/authentication.middleware");
const lintMiddleware = require("../middleware/lint.middleware");

const router = express.Router();

router.post("/register", lintMiddleware, userRegisterController);

router.post("/login", lintMiddleware, userLoginController);

router.get("/me", authMiddleware, getCurrentUserController);

router.delete("/delete", lintMiddleware, authMiddleware, deleteUserController);

router.patch("/change-password", lintMiddleware, authMiddleware, changePasswordController);

router.post("/logout", lintMiddleware, authMiddleware, logoutUserController);

router.patch("/profile", lintMiddleware, authMiddleware, updateProfileController);

router.post("/forgot-password", lintMiddleware, forgotPasswordController);

router.patch("/reset-password", lintMiddleware, resetPasswordController);

module.exports = router;