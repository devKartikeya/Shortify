const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./users.model");

async function userRegisterService(username, email, password) {

    // Check whether username already exists
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
        throw new Error("Username already exists");
    }

    // Check whether email already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        throw new Error("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    return {
        id: user._id,
        username: user.username,
        email: user.email
    };
}


async function userLoginService(email, password) {

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    };
}


module.exports = {
    userRegisterService,
    userLoginService
};