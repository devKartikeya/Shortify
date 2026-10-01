const {
    connectRabbitMQ,
    getRabbitMQChannel
} = require("../configurations/rabbitmq");

const { sendWelcomeEmail } = require("../email/email.service");

async function start() {
    await connectRabbitMQ();

    const channel = getRabbitMQChannel();

    channel.consume("welcome_email_queue", async (message) => {
        if (!message) return;

        try {
            const payload = JSON.parse(
                message.content.toString()
            );

            console.log("Processing welcome email:", payload.email);

            await sendWelcomeEmail({
                username: payload.username,
                email: payload.email
            });

            channel.ack(message);

            console.log(
                `Welcome email sent to ${payload.email}`
            );

        } catch (error) {
            console.error(
                "Welcome email worker failed:",
                error
            );

            channel.nack(message, false, false);
        }
    });

    console.log("Welcome email worker started");
}

start();