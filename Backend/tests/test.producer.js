const { connectRabbitMQ, getRabbitMQChannel } = require("../configurations/rabbitmq");

async function sendTestMessage() {
    await connectRabbitMQ();

    const channel = getRabbitMQChannel();

    channel.publish(
        "shortify_exchange",
        "user.registered",
        Buffer.from("Message from test.producer.js")
    );

    console.log("Message sent to exchange");

}

sendTestMessage();