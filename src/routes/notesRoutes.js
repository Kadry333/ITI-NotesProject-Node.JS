const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notesController");
const validateMiddleware = require("../middleware/validateMiddleware");
const {createNoteValidation,updateNoteValidation} = require("../validations/notesValidations");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect,notesController.getAllNotes)
.post(protect,createNoteValidation,validateMiddleware,notesController.createNote);

router.route("/:id").get(protect,notesController.getNote).
patch(protect,updateNoteValidation,validateMiddleware,notesController.updateNote)
.delete(protect,notesController.deleteNote);

module.exports = router;