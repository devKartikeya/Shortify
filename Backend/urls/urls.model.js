const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true,
            trim: true
        },

        shortCode: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
            index: true
        },

        clicks: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;