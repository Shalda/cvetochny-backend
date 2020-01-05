const express = require("express");
const VisualController = require("../controllers/visuals");
const router = express.Router();
const extractFile = require("../middleware/fileVisual");

router.get("", VisualController.getVisuals);
router.post("", extractFile, VisualController.createVisual);
router.put("/:id", extractFile, VisualController.updateVisual);
// router.get("/:id", VisualController.getVisual);
router.delete("/:id", VisualController.deleteVisual);
module.exports = router;