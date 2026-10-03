const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const pad = (num) => (num > 9 ? "" : "0") + num;

const generator = (time, index) => {
    if (!time) return "access.log";
    const month =
        time.getFullYear() + "" + pad(time.getMonth() + 1);
    const day = pad(time.getDate());

    // Backend/logs/202610/
    const logDirectory = path.join(
        __dirname,
        "..",
        "logs",
        month
    );

    fs.mkdirSync(logDirectory, {
        recursive: true
    });
    return `${month}/${month}${day}-${index}-access.log`;
};

const accessLogStream = rfs.createStream(generator, {
    interval: "1d",
    path: path.join(__dirname, "..", "logs"), // 👈 change this
    maxFiles: 30,
    compress: "gzip",
    size: "1K",
});

module.exports = accessLogStream;