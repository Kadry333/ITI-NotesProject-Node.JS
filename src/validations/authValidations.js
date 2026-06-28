const { body} = require("express-validator");

const registerValidation = [
    body("name").trim()
    .notEmpty().withMessage("Please enter your name")
    .isLength({min:3}).withMessage("Name must be at least 3 characters"),

    body("email").trim()
    .notEmpty().withMessage("Please enter your email")
    .isEmail().withMessage("Please enter a valid email"),

    body("password").trim()
    .notEmpty().withMessage("Please enter your password")
    .isLength({min:8}).withMessage("Password must be at least 8 characters")
];

const loginValidation = [
    body("email").trim()
    .notEmpty().withMessage("Please enter your email")
    .isEmail().withMessage("Please enter a valid email"),

    body("password").trim()
    .notEmpty().withMessage("Please enter your password")
];

module.exports = {registerValidation,loginValidation};