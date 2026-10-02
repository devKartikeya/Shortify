const {
    connectRabbitMQ,
    getRabbitMQChannel
} = require("../configurations/rabbitmq");

const { sendWelcomeEmail } = require("../email/email.service");

async function start() {
    await connectRabbitMQ();

    const channel = getRabbitMQChannel();

    /* This will ensure that the worker processes one message at a time, which is important for sending emails to avoid overwhelming the email service. (Backpressure) */
    /* What is Backpressure? Backpressure is a mechanism to control the rate at which messages are consumed from a queue, preventing the system from being overwhelmed. */
    channel.prefetch(1);

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