/* Server Configurations */
function serverConfigurations() {
    return [
        {
            url: "http://backend-1:3000",
            healthy: true
        },
        {
            url: "http://backend-2:3000",
            healthy: true
        }
    ];
}

module.exports = serverConfigurations;