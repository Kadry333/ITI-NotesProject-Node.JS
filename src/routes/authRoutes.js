const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateMiddleware = require("../middleware/validateMiddleware");
const {registerValidation,loginValidation} = require("../validations/authValidations");
const protect = require("../middleware/authMiddleware");


router.route("/register")
.post(registerValidation,validateMiddleware,authController.register);

router.route("/login")
.post(loginValidation,validateMiddleware,authController.login);

router.route("/me")
.get(protect,authController.getMe);

module.exports = router;