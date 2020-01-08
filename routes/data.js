const express = require("express");
const dataController = require("../controllers/data");
const router = express.Router();
const extractFile = require("../middleware/fileVisual");

router.get("", dataController.getVisuals);
router.post("", extractFile, dataController.createVisual);
router.put("/:id", extractFile, dataController.updateVisual);
// router.get("/:id", VisualController.getVisual);
router.delete("/:id", dataController.deleteVisual);
module.exports = router;