const UAParser = require("ua-parser-js");

function parseUserAgent(userAgent) {
    const parser = new UAParser(userAgent);

    const device = parser.getDevice();
    const os = parser.getOS();
    const browser = parser.getBrowser();

    return {
        deviceType: device.type || "desktop",
        os: os.name
            ? `${os.name}${os.version ? ` ${os.version}` : ""}`
            : "unknown",
        browser: browser.name
            ? `${browser.name}${browser.version ? ` ${browser.version}` : ""}`
            : "unknown",
    };
}

module.exports = parseUserAgent;