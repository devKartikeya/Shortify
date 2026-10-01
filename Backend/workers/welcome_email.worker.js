const { connectRabbitMQ, getRabbitMQChannel } = require("../configurations/rabbitmq");

async function start() {
    await connectRabbitMQ();

    const channel = getRabbitMQChannel();

    channel.consume("welcome_email_queue", async (message) => {
        if (!message) return;

        try {
            const payload = JSON.parse(
                message.content.toString()
            );
            console.log("WELCOME EMAIL JOB:", payload);

            //Call the email service to send the welcome email
            channel.ack(message);

        } catch (error) {
            console.error("Welcome email worker failed:", error);
            // For now don't requeue
            channel.nack(message, false, false);
        }
    });

    console.log("Welcome email worker started");
}

start();