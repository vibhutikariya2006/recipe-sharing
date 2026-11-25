const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllRecipes, getMyRecipes, addRecipe, updateRecipe, deleteRecipe, getRecipeById } = require("../controllers/recipeController");
const upload = require("../middleware/upload");


router.get("/", getAllRecipes);
router.get("/my-recipes", authMiddleware, getMyRecipes);
router.post("/", authMiddleware, upload.single("image"), addRecipe);
router.get("/:id", getRecipeById);
router.put("/:id", authMiddleware, upload.single("image"), updateRecipe);
router.delete("/:id", authMiddleware, deleteRecipe);

module.exports = router;
