const axios = require("axios");

async function sendContactEmail({
    name,
    email,
    subject,
    message
}) {
    const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
            sender: {
                name: "Shortify",
                email: process.env.SUPPORT_EMAIL
            },
            to: [
                {
                    email: process.env.SUPPORT_EMAIL
                }
            ],
            replyTo: {
                email
            },
            subject,
            htmlContent: `
                <h2>New Contact Request</h2>

                <p>
                    <strong>Name:</strong> ${name}
                </p>

                <p>
                    <strong>Email:</strong> ${email}
                </p>

                <p>
                    <strong>Subject:</strong> ${subject}
                </p>

                <p>
                    <strong>Message:</strong>
                </p>

                <p>
                    ${message}
                </p>
            `
        },
        {
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}

async function sendPasswordResetEmail({
    email,
    resetUrl
}) {
    const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
            sender: {
                name: "Shortify",
                email: process.env.SUPPORT_EMAIL
            },
            to: [
                {
                    email
                }
            ],
            subject: "Reset your Shortify password",
            htmlContent: `
                <h2>Password Reset Request</h2>

                <p>
                    We received a request to reset your Shortify password.
                </p>

                <p>
                    Click the button below to reset your password:
                </p>

                <p>
                    <a
                        href="${resetUrl}"
                        style="
                            display: inline-block;
                            padding: 10px 18px;
                            background-color: #eab308;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 6px;
                        "
                    >
                        Reset Password
                    </a>
                </p>

                <p>
                    This link will expire in 30 minutes.
                </p>

                <p>
                    If you did not request a password reset,
                    you can safely ignore this email.
                </p>
            `
        },
        {
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}

module.exports = {
    sendContactEmail,
    sendPasswordResetEmail
};