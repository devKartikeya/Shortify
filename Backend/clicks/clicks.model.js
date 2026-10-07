const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema(
    {
        urlId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "URL",
            required: true,
            index: true,
        },

        shortCode: {
            type: String,
            required: true,
            index: true,
        },

        clickedAt: {
            type: Date,
            default: Date.now,
            index: true,
        },

        ip: {
            type: String,
        },

        userAgent: {
            type: String,
        },

        device: {
            type: {
                type: String,
                enum: ["desktop", "mobile", "tablet", "bot", "unknown"],
                default: "unknown",
            },

            os: {
                type: String,
                default: "unknown",
            },

            browser: {
                type: String,
                default: "unknown",
            },
        },

        geo: {
            country: {
                type: String,
                default: "unknown",
            },

            region: {
                type: String,
                default: "unknown",
            },

            city: {
                type: String,
                default: "unknown",
            },
        },

        referrer: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Most common analytics query:
// "Give me clicks for this URL, newest first"
clickSchema.index({
    urlId: 1,
    clickedAt: -1,
});

module.exports = mongoose.model("Click", clickSchema);