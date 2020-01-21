const express = require("express");
const OrderController = require("../controllers/orders");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("", OrderController.createOrder);
router.get("", OrderController.getOrders);
router.put("/:id", checkAuth, OrderController.updateOrder);
router.delete("/:id", checkAuth, OrderController.deleteOrder);
module.exports = router;