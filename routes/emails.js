const express = require("express");
const EmailController = require("../controllers/emails");
const router = express.Router();


router.post("", EmailController.consultationEmail);
router.post("/oneclick", EmailController.oneClickOrder);
router.post("/order", EmailController.orderEmail);
router.post("/visual", EmailController.visualEmail);
module.exports = router;