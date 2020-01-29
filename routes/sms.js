const express = require("express");
const router = express.Router();
const SmsController = require('../controllers/epochta');
router.post("", SmsController.sendSMS);
module.exports = router;