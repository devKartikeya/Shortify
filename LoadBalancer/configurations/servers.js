/* Server Configurations */
function serverConfigurations() {
    return [
        {
            url: "http://host.docker.internal:3000",
            healthy: true
        },
        {
            url: "http://host.docker.internal:3001",
            healthy: true
        }
    ];
}

module.exports = serverConfigurations;