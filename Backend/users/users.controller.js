const {
    userRegisterService,
    userLoginService
} = require("./users.service");

async function userRegisterController(req, res) {
    try {
        const { username, email, password } = req.body;
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
        const { email, password } = req.body;

        // Basic validation
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
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: result.token,
            user: result.user
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    userRegisterController,
    userLoginController
};