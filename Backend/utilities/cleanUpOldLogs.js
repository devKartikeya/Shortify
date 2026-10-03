const fs = require("fs");
const path = require("path");

function cleanUpOldLogs() {
    const logDirectory = path.join(__dirname, "..", "logs");
    const maxAge = 30 * 60 * 1000; /* 30 minute older */

    function scanDirectory(directory) {
        fs.readdir(directory, { withFileTypes: true }, (err, entries) => {
            if (err) {
                console.error("Error reading log directory:", err);
                return;
            }

            entries.forEach((entry) => {
                const filePath = path.join(directory, entry.name);

                if (entry.isDirectory()) {
                    scanDirectory(filePath);
                    return;
                }

                // Never delete active log file
                if (entry.name === "access.log") {
                    return;
                }

                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error("Error reading file stats:", err);
                        return;
                    }

                    const fileAge =
                        Date.now() - stats.mtime.getTime();

                    if (fileAge > maxAge) {
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error(
                                    "Error deleting log file:",
                                    err
                                );
                            } else {
                                console.log(
                                    "Deleted old log file:",
                                    filePath
                                );
                            }
                        });
                    }
                });
            });
        });
    }

    scanDirectory(logDirectory);
}

module.exports = cleanUpOldLogs;