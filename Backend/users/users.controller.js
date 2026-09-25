const crypto = require("crypto");
const User = require("./users.model");
const bcrypt = require("bcrypt");
const generateResetToken = require("../utilities/generateResetToken");

const sendPasswordResetEmail = require("../email/email.service").sendPasswordResetEmail;

const {
    userRegisterService,
    userLoginService,
    deleteUserService,
    changePasswordService,
    updateProfileService
} = require("./users.service");

async function userRegisterController(req, res) {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, email and password are required"
            });
        }

        const user = await userRegisterService(
            username,
            email,
            password
        );

        // Store JWT in HTTP-only cookie
        res.cookie("token", user.token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function userLoginController(req, res) {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const result = await userLoginService(
            email,
            password
        );

        // Store JWT in HTTP-only cookie
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: result.user
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}

function getCurrentUserController(req, res) {
    res.status(200).json({
        success: true,
        user: req.user
    });
}

function deleteUserController(req, res) {
    deleteUserService(req.user.id)
        .then(() => {
            res.clearCookie("token", {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            });
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Failed to delete user",
                error: error.message
            });
        });

}

function changePasswordController(req, res) {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "New passwords do not match"
        });
    }
    changePasswordService(req.user.id, oldPassword, newPassword)
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Password changed successfully"
            });
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                message: error.message
            });
        });
};

function logoutUserController(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
}

async function updateProfileController(req, res) {
    try {
        const { username, email } = req.body;

        const user = await updateProfileService(
            req.user.id,
            {
                username,
                email
            }
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });

    } catch (error) {
        console.error("Update profile error:", error);

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}


async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email address is required"
            });
        }

        const user = await User.findOne({ email });

        // Do not reveal whether the email exists
        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    "If an account exists with this email, a password reset link has been sent"
            });
        }

        // Generate raw reset token
        const resetToken = generateResetToken();

        // Hash token before storing it in database
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Token expires after 30 minutes
        const resetTokenExpiry = new Date(
            Date.now() + 30 * 60 * 1000
        );

        await User.updateOne(
            { _id: user._id },
            {
                passwordResetToken: hashedToken,
                passwordResetExpires: resetTokenExpiry
            }
        );

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        await sendPasswordResetEmail({ email: user.email, resetUrl });

        return res.status(200).json({
            success: true,
            message:
                "If an account exists with this email, a password reset link has been sent"
        });

    } catch (error) {
        console.error(
            "Forgot password error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}


async function resetPasswordController(req, res) {
    try {
        const {
            token,
            newPassword,
            confirmPassword
        } = req.body;

        if (!token || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters"
            });
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: {
                $gt: new Date()
            }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid or expired password reset link"
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        // Make the reset token single-use
        user.passwordResetToken = null;
        user.passwordResetExpires = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message:
                "Password reset successfully"
        });

    } catch (error) {
        console.error(
            "Reset password error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

module.exports = {
    userRegisterController,
    userLoginController,
    getCurrentUserController,
    deleteUserController,
    changePasswordController,
    logoutUserController,
    updateProfileController,
    forgotPasswordController,
    resetPasswordController
};