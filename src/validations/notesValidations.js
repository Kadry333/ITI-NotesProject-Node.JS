const { body } = require("express-validator");

const createNoteValidation = [
    body("title").trim().notEmpty().withMessage("Please enter your title")
    .isLength({min:3}).withMessage("Title must be at least 3 characters"),

    body("content").trim().notEmpty().withMessage("Please enter your content")
    .isLength({min:10}).withMessage("Content must be at least 10 characters"),
    
    body("category").optional().trim(),

    body("status").optional().trim().isIn(["Active","Archived"]).withMessage("Status must be Active or Archived"),

    body("isPinned").optional().trim().isBoolean().withMessage("isPinned must be true or false"),

    body("tags").optional().isArray().withMessage("Tags must be an array")
];

const updateNoteValidation = [
    body("title").optional().trim().notEmpty().withMessage("Please enter your title")
    .isLength({min:3}).withMessage("Title must be at least 3 characters"),

    body("content").optional().trim().notEmpty().withMessage("Please enter your content")
    .isLength({min:10}).withMessage("Content must be at least 10 characters"),
    
    body("category").optional().trim(),

    body("status").optional().trim().isIn(["Active","Archived"]).withMessage("Status must be Active or Archived"),

    body("isPinned").optional().trim().isBoolean().withMessage("isPinned must be true or false"),

    body("tags").optional().isArray().withMessage("Tags must be an array")
];

module.exports = {createNoteValidation,updateNoteValidation};