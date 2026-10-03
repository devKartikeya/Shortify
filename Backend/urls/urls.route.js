const express = require("express");
const router = express.Router();
const {
    createShortUrlController,
    getMyLinksController,
    clearRedisController,
    deleteUrlController
} = require("./urls.controller");

const authMiddleware = require("../middleware/authentication.middleware");
const lintMiddleware = require("../middleware/lint.middleware");

// Public URL shortening
router.post("/shorten", lintMiddleware, createShortUrlController);

// Authenticated URL shortening
router.post("/shorten/authenticated", lintMiddleware, authMiddleware, createShortUrlController);

// Get logged-in user's URLs
router.get("/my-links", authMiddleware, getMyLinksController);

router.get("/delete/:shortCode", lintMiddleware, authMiddleware, deleteUrlController);

router.get("/clear-redis", lintMiddleware, clearRedisController)

module.exports = router;