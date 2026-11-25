const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getComments, addComment, deleteComment } = require("../controllers/commentController");

router.post("/:recipeId", authMiddleware, addComment);
router.get("/:recipeId", getComments);
router.delete("/:id", authMiddleware, deleteComment);

module.exports = router;
