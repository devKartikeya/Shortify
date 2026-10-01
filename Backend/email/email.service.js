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

            subject: `New Contact Request — ${subject}`,

            htmlContent: `
                <div style="
                    margin: 0;
                    padding: 40px 20px;
                    background-color: #f5f5f5;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #18181b;
                ">
                    <div style="
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border: 1px solid #e4e4e7;
                        border-radius: 12px;
                        overflow: hidden;
                    ">

                        <!-- Header -->
                        <div style="
                            padding: 24px 30px;
                            background-color: #18181b;
                        ">
                            <div style="
                                font-size: 22px;
                                font-weight: 700;
                                color: #ffffff;
                            ">
                                Shortify
                            </div>

                            <div style="
                                margin-top: 5px;
                                font-size: 13px;
                                color: #a1a1aa;
                            ">
                                Contact Request
                            </div>
                        </div>

                        <!-- Body -->
                        <div style="padding: 30px;">

                            <h2 style="
                                margin: 0 0 8px;
                                font-size: 22px;
                                color: #18181b;
                            ">
                                New message received
                            </h2>

                            <p style="
                                margin: 0 0 28px;
                                font-size: 14px;
                                line-height: 1.6;
                                color: #71717a;
                            ">
                                Someone has submitted a new message through
                                the Shortify contact form.
                            </p>

                            <!-- Contact Details -->
                            <div style="
                                padding: 20px;
                                background-color: #fafafa;
                                border: 1px solid #e4e4e7;
                                border-radius: 8px;
                            ">

                                <p style="margin: 0 0 12px;">
                                    <strong>Name</strong><br>
                                    <span style="color: #52525b;">
                                        ${name}
                                    </span>
                                </p>

                                <p style="margin: 0 0 12px;">
                                    <strong>Email</strong><br>
                                    <span style="color: #52525b;">
                                        ${email}
                                    </span>
                                </p>

                                <p style="margin: 0;">
                                    <strong>Subject</strong><br>
                                    <span style="color: #52525b;">
                                        ${subject}
                                    </span>
                                </p>

                            </div>

                            <!-- Message -->
                            <div style="margin-top: 24px;">

                                <p style="
                                    margin: 0 0 10px;
                                    font-size: 14px;
                                    font-weight: 700;
                                ">
                                    Message
                                </p>

                                <div style="
                                    padding: 16px;
                                    background-color: #fafafa;
                                    border-left: 3px solid #eab308;
                                    border-radius: 4px;
                                    font-size: 14px;
                                    line-height: 1.7;
                                    color: #52525b;
                                ">
                                    ${message}
                                </div>

                            </div>

                            <p style="
                                margin: 28px 0 0;
                                font-size: 12px;
                                color: #a1a1aa;
                            ">
                                Reply directly to this email to respond to
                                ${name}.
                            </p>

                        </div>

                        <!-- Footer -->
                        <div style="
                            padding: 20px 30px;
                            background-color: #fafafa;
                            border-top: 1px solid #e4e4e7;
                            text-align: center;
                        ">
                            <p style="
                                margin: 0;
                                font-size: 12px;
                                color: #a1a1aa;
                            ">
                                © ${new Date().getFullYear()} Shortify
                            </p>
                        </div>

                    </div>
                </div>
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
                <div style="
                    margin: 0;
                    padding: 40px 20px;
                    background-color: #f5f5f5;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #18181b;
                ">
                    <div style="
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border: 1px solid #e4e4e7;
                        border-radius: 12px;
                        overflow: hidden;
                    ">

                        <!-- Header -->
                        <div style="
                            padding: 24px 30px;
                            background-color: #18181b;
                        ">
                            <div style="
                                font-size: 22px;
                                font-weight: 700;
                                color: #ffffff;
                            ">
                                Shortify
                            </div>

                            <div style="
                                margin-top: 5px;
                                font-size: 13px;
                                color: #a1a1aa;
                            ">
                                Account Security
                            </div>
                        </div>

                        <!-- Body -->
                        <div style="padding: 32px 30px;">

                            <h2 style="
                                margin: 0 0 12px;
                                font-size: 24px;
                                color: #18181b;
                            ">
                                Reset your password
                            </h2>

                            <p style="
                                margin: 0 0 18px;
                                font-size: 14px;
                                line-height: 1.7;
                                color: #52525b;
                            ">
                                We received a request to reset the password
                                associated with your Shortify account.
                            </p>

                            <p style="
                                margin: 0 0 28px;
                                font-size: 14px;
                                line-height: 1.7;
                                color: #52525b;
                            ">
                                If you made this request, click the button
                                below to choose a new password.
                            </p>

                            <!-- CTA -->
                            <div style="text-align: center; margin: 30px 0;">

                                <a
                                    href="${resetUrl}"
                                    style="
                                        display: inline-block;
                                        padding: 13px 24px;
                                        background-color: #eab308;
                                        color: #ffffff;
                                        text-decoration: none;
                                        font-size: 14px;
                                        font-weight: 700;
                                        border-radius: 7px;
                                    "
                                >
                                    Reset Password
                                </a>

                            </div>

                            <!-- Expiry -->
                            <div style="
                                padding: 15px 16px;
                                background-color: #fffbeb;
                                border: 1px solid #fde68a;
                                border-radius: 7px;
                            ">
                                <p style="
                                    margin: 0;
                                    font-size: 13px;
                                    line-height: 1.6;
                                    color: #92400e;
                                ">
                                    <strong>This link expires in 30 minutes.</strong>
                                    For your security, please complete the
                                    password reset before it expires.
                                </p>
                            </div>

                            <p style="
                                margin: 28px 0 0;
                                font-size: 13px;
                                line-height: 1.7;
                                color: #71717a;
                            ">
                                If you did not request a password reset,
                                no action is required. Your password will
                                remain unchanged.
                            </p>

                            <p style="
                                margin: 20px 0 0;
                                font-size: 13px;
                                line-height: 1.7;
                                color: #71717a;
                            ">
                                For your security, never share this link
                                with anyone.
                            </p>

                        </div>

                        <!-- Footer -->
                        <div style="
                            padding: 20px 30px;
                            background-color: #fafafa;
                            border-top: 1px solid #e4e4e7;
                            text-align: center;
                        ">
                            <p style="
                                margin: 0;
                                font-size: 12px;
                                color: #a1a1aa;
                            ">
                                This is an automated security email from Shortify.
                            </p>

                            <p style="
                                margin: 6px 0 0;
                                font-size: 12px;
                                color: #a1a1aa;
                            ">
                                © ${new Date().getFullYear()} Shortify
                            </p>
                        </div>

                    </div>
                </div>
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


async function sendWelcomeEmail({
    username,
    email
}) {
    await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
            sender: {
                email: process.env.SUPPORT_EMAIL,
                name: "Shortify"
            },

            to: [
                {
                    email,
                    name: username
                }
            ],

            subject: "Welcome to Shortify 🚀",

            htmlContent: `
                <div style="
                    margin: 0;
                    padding: 40px 20px;
                    background-color: #f5f5f5;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #18181b;
                ">
                    <div style="
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border: 1px solid #e4e4e7;
                        border-radius: 12px;
                        overflow: hidden;
                    ">

                        <!-- Header -->
                        <div style="
                            padding: 28px 30px;
                            background-color: #18181b;
                        ">
                            <div style="
                                font-size: 24px;
                                font-weight: 700;
                                color: #ffffff;
                            ">
                                Shortify
                            </div>

                            <div style="
                                margin-top: 6px;
                                font-size: 13px;
                                color: #a1a1aa;
                            ">
                                Simple links. Smarter sharing.
                            </div>
                        </div>

                        <!-- Body -->
                        <div style="padding: 34px 30px;">

                            <p style="
                                margin: 0 0 8px;
                                font-size: 14px;
                                color: #71717a;
                            ">
                                Welcome aboard,
                            </p>

                            <h2 style="
                                margin: 0 0 18px;
                                font-size: 26px;
                                color: #18181b;
                            ">
                                ${username} 👋
                            </h2>

                            <p style="
                                margin: 0 0 16px;
                                font-size: 15px;
                                line-height: 1.7;
                                color: #52525b;
                            ">
                                Your Shortify account is ready to go.
                                You can now create, manage, and share
                                shortened URLs from one place.
                            </p>

                            <!-- Feature highlights -->
                            <div style="
                                margin: 28px 0;
                                padding: 20px;
                                background-color: #fafafa;
                                border: 1px solid #e4e4e7;
                                border-radius: 8px;
                            ">

                                <p style="
                                    margin: 0 0 14px;
                                    font-size: 14px;
                                    font-weight: 700;
                                    color: #18181b;
                                ">
                                    What you can do with Shortify
                                </p>

                                <p style="
                                    margin: 8px 0;
                                    font-size: 14px;
                                    color: #52525b;
                                ">
                                    ✓ Create short, shareable links
                                </p>

                                <p style="
                                    margin: 8px 0;
                                    font-size: 14px;
                                    color: #52525b;
                                ">
                                    ✓ Manage your links from your dashboard
                                </p>

                                <p style="
                                    margin: 8px 0;
                                    font-size: 14px;
                                    color: #52525b;
                                ">
                                    ✓ Track link activity and performance
                                </p>

                            </div>

                            <p style="
                                margin: 0 0 24px;
                                font-size: 15px;
                                line-height: 1.7;
                                color: #52525b;
                            ">
                                We're glad to have you with us. Start
                                shortening your first URL and make sharing
                                links simpler.
                            </p>

                            <p style="
                                margin: 0;
                                font-size: 14px;
                                line-height: 1.7;
                                color: #52525b;
                            ">
                                — Team Shortify
                            </p>

                        </div>

                        <!-- Footer -->
                        <div style="
                            padding: 20px 30px;
                            background-color: #fafafa;
                            border-top: 1px solid #e4e4e7;
                            text-align: center;
                        ">
                            <p style="
                                margin: 0;
                                font-size: 12px;
                                color: #a1a1aa;
                            ">
                                You received this email because an account
                                was created using this address.
                            </p>

                            <p style="
                                margin: 6px 0 0;
                                font-size: 12px;
                                color: #a1a1aa;
                            ">
                                © ${new Date().getFullYear()} Shortify
                            </p>
                        </div>

                    </div>
                </div>
            `
        },
        {
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json"
            }
        }
    );
}


module.exports = {
    sendContactEmail,
    sendPasswordResetEmail,
    sendWelcomeEmail
};