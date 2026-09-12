/* Load Balancer */
const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxyServer();

const servers = [
    "http://localhost:3000",
    "http://localhost:3001"
]

let currentServer = 0;

app.use(async (req, res) => {
    const target = servers[currentServer];

    currentServer = (currentServer + 1) % servers.length;
    proxy.web(req, res, {
        target
    });
});

app.listen(4000, () => {
    console.log(`Load balancer listning on port 4000`);
});