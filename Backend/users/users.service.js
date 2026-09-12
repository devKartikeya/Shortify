const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./users.model");

async function userRegisterService(username, email, password) {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        throw new Error("Username already exists");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new Error("Email already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
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


async function userLoginService(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

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

function deleteUserService(userId) {
    return User.findByIdAndDelete(userId);
}

function changePasswordService(userId, oldPassword, newPassword) {
    return User.findById(userId)
        .then(async (user) => {
            if (!user) {
                throw new Error("User not found");
            }
            const isOldPasswordCorrect = await bcrypt.compare(
                oldPassword,
                user.password
            );
            if (!isOldPasswordCorrect) {
                throw new Error("Current password is incorrect");
            }
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedNewPassword;
            return user.save();
        });
}

module.exports = {
    userRegisterService,
    userLoginService,
    deleteUserService,
    changePasswordService
};