const { connectRabbitMQ, getRabbitMQChannel } = require("../configurations/rabbitmq");

async function sendTestMessage() {
    await connectRabbitMQ();

    const channel = getRabbitMQChannel();

    channel.sendToQueue(
        "email_queue",
        Buffer.from("Hello from Shortify Producer")
    );

    console.log("Message sent to email_queue");
}

sendTestMessage();