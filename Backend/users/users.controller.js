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

module.exports = {
    userRegisterController,
    userLoginController,
    getCurrentUserController,
    deleteUserController,
    changePasswordController,
    logoutUserController,
    updateProfileController
};