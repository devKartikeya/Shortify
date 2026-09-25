const sendContactEmail = require("./email.service").sendContactEmail;


async function sendContactEmailController(req, res) {
    try {
        const {name,email,subject,message} = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }
        // Send email
        await sendContactEmail({
            name,
            email,
            subject,
            message
        });

        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully"
        });
    } catch (error) {
        console.error(
            "Contact email error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to send your message"
        });
    }
}

module.exports = {
    sendContactEmailController
};