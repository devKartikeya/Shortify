/* Load Balancer (Round-Robin)*/
const express = require("express");
const httpProxy = require("http-proxy");
const rateLimiter = require("./configurations/rate-limiter");
const serverConfigurations = require("./configurations/servers");
const corsOptions = require("./configurations/cors")

const app = express();
app.use(rateLimiter);
app.use(corsOptions);
const proxy = httpProxy.createProxyServer();

const servers = serverConfigurations();

let currentServer = 0;

/* Health check for backend servers */
setInterval(() => {
    servers.forEach((server, index) => {
        const options = {
            method: "GET",
            timeout: 2000
        };
        /* Perform health check by sending a request to the /health endpoint of each server */
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
    })
}, 5000);

/* Proxy requests to backend servers */
app.use(async (req, res) => {
    /* Filter out unhealthy servers */
    const healthyServers = servers.filter(server => server.healthy);
    if (healthyServers.length === 0) {
        res.status(503).send("No healthy servers available");
        return;
    }

    /* Round-robin load balancing */
    currentServer = (currentServer + 1) % healthyServers.length;
    const target = healthyServers[currentServer].url;

    /* Proxy the request to the selected backend server */
    proxy.web(req, res, { target }, (err) => {
        console.error(`Error proxying request to ${target}:`, err);
        res.status(500).send("Internal Server Error");
    });
});

app.listen(4000, () => {
    console.log(`Load balancer listning on port 4000`);
});