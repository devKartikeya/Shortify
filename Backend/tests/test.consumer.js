const { connectRabbitMQ, getRabbitMQChannel } = require("../configurations/rabbitmq");

async function startConsumer() {
    await connectRabbitMQ();

    const channel = getRabbitMQChannel();

    channel.consume("welcome_email_queue", (message) => {
        if (!message) return;

        const content = message.content.toString();

        console.log("WELCOME EMAIL WORKER: received: ", content);

        channel.ack(message);
    });
}

startConsumer();