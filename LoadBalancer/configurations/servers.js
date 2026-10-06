/* Server Configurations */
function serverConfigurations() {
    return [
        {
            url: "http://localhost:3000",
            healthy: true
        },
        {
            url: "http://localhost:3001",
            healthy: true
        }
    ];
}

module.exports = serverConfigurations;