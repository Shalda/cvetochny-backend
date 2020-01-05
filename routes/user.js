const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post("/signup", checkAuth, UserController.createUser);
router.post("/login", UserController.userLogin);

module.exports = router;
