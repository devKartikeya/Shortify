const express = require("express");
const router = express.Router();
const sendContactEmailController = require("./email.controller").sendContactEmailController;

router.post("/contact", sendContactEmailController);

module.exports = router;