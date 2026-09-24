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

module.exports = {
    sendContactEmail
};