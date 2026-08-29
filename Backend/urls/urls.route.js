const express = require("express");

const {
    createShortUrlController,
    redirectUrlController
} = require("./urls.controller");

const router = express.Router();


// Create short URL
router.post(
    "/shorten",
    createShortUrlController
);

module.exports = router;