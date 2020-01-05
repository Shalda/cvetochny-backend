const express = require("express");
const ProductController = require("../controllers/products");
const router = express.Router();
const extractFile = require("../middleware/singleFile");
const checkAuth = require("../middleware/check-auth");

router.get("", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);
router.post("", checkAuth, extractFile, ProductController.createProduct);
router.put("/:id", checkAuth, extractFile, ProductController.updateProduct);
router.delete("/:id", checkAuth, ProductController.deleteProduct);
module.exports = router;