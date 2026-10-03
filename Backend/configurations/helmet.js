const helmet = require("helmet");

const helmetConfig = helmet({
    /* Content Security Policy */
    contentSecurityPolicy: false,

    /* Browser Security */
    noSniff: true,

    /* Referrer Policy */
    referrerPolicy: {
        policy: "strict-origin-when-cross-origin"
    },

    /*Clickjacking protection*/
    frameguard: {
        action: "deny"
    },
    
    /*Cross-site scripting (XSS) protection*/
    hsts: false
});

module.exports = helmetConfig;