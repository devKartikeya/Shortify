const express = require("express");
const {
    createShortUrlController,
    redirectUrlController,
    getMyLinksController
} = require("./urls.controller");

const authMiddleware = require("../middleware/authentication.middleware");
const router = express.Router();

// Public URL shortening
router.post(
    "/shorten",
    createShortUrlController
);

// Authenticated URL shortening
router.post(
    "/shorten/authenticated",
    authMiddleware,
    createShortUrlController
);

// Get logged-in user's URLs
router.get(
    "/my-links",
    authMiddleware,
    getMyLinksController
);

module.exports = router;