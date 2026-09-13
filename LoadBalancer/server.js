/* Load Balancer */
const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxyServer();

const servers = [
    {
        url: "http://localhost:3000",
        healthy: true
    },
    {
        url: "http://localhost:3001",
        healthy: true
    }
];

let currentServer = 0;

setInterval(() => {
    servers.forEach((server, index) => {
        const options = {
            method: "GET",
            timeout: 2000
        };
        fetch(`${server.url}/health`, options)
            .then(response => {
                if (response.ok) {
                    servers[index].healthy = true;
                } else {
                    servers[index].healthy = false;
                }
            })
            .catch(() => {
                servers[index].healthy = false;
            });
    })}, 5000);

    app.use(async (req, res) => {
        const healthyServers = servers.filter(server => server.healthy);
        if (healthyServers.length === 0) {
            res.status(503).send("No healthy servers available");
            return;
        }

        currentServer = (currentServer + 1) % healthyServers.length;
        const target = healthyServers[currentServer].url;

        proxy.web(req, res, { target }, (err) => {
            console.error(`Error proxying request to ${target}:`, err);
            res.status(500).send("Internal Server Error");
        });
    });

    app.listen(4000, () => {
        console.log(`Load balancer listning on port 4000`);
    });