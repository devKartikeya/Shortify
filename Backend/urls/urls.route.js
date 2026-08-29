const express = require("express");

const {
    createShortUrlController
} = require("./urls.controller");

const router = express.Router();

router.post(
    "/shorten",
    createShortUrlController
);

module.exports = router;