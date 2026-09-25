const express = require("express");
const router = express.Router();
const {
    createShortUrlController,
    getMyLinksController,
    clearRedisController,
    deleteUrlController
} = require("./urls.controller");

const authMiddleware = require("../middleware/authentication.middleware");

// Public URL shortening
router.post("/shorten", createShortUrlController);

// Authenticated URL shortening
router.post("/shorten/authenticated", authMiddleware, createShortUrlController);

// Get logged-in user's URLs
router.get("/my-links", authMiddleware, getMyLinksController);

router.get("/delete/:shortCode", deleteUrlController);

router.get("/clear-redis", clearRedisController)

module.exports = router;