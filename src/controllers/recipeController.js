const Recipe = require("../models/Recipe");
const cloudinary = require("../config/cloudinary");

exports.addRecipe = async (req, res) => {
    try {
        const {
            title,
            description,
            ingredients,
            instructions,
            category,
            prepTime,
            cookTime,
            difficulty
        } = req.body;

        // Check required fields
        if (!title || !description || !ingredients ||
            !instructions || !category) {
            return res.status(400).json({
                message: "Please provide all required recipe fields"
            });
        }

        // Convert ingredients and instructions into arrays
        let ingredientList;
        let instructionList;

        try {
            ingredientList = JSON.parse(ingredients);
            instructionList = JSON.parse(instructions);
        } catch (error) {
            return res.status(400).json({
                message: "Ingredients and instructions must be valid JSON arrays"
            });
        }

        if (!Array.isArray(ingredientList) ||
            !Array.isArray(instructionList)) {
            return res.status(400).json({
                message: "Ingredients and instructions must be arrays"
            });
        }

        // Upload image to Cloudinary
        let image = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
                {
                    folder: "recipe-sharing"
                }
            );

            image = result.secure_url;
        }

        const newRecipe = new Recipe({
            title,
            description,
            ingredients: ingredientList,
            instructions: instructionList,
            category,
            image,
            prepTime,
            cookTime,
            difficulty,
            author: req.user._id
        });

        await newRecipe.save();

        res.status(201).json({
            message: "Recipe added successfully",
            recipe: newRecipe
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};





exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
            .populate("author", "username");

        res.status(200).json({
            recipes
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate("author", "username");

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.status(200).json({
            recipe
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.getMyRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({
            author: req.user._id
        });

        res.status(200).json({
            recipes
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        if (recipe.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update this recipe"
            });
        }

        const {
            title,
            description,
            ingredients,
            instructions,
            category,
            prepTime,
            cookTime,
            difficulty
        } = req.body;

        if (title !== undefined) recipe.title = title;
        if (description !== undefined) recipe.description = description;
        if (ingredients !== undefined) recipe.ingredients = JSON.parse(ingredients);
        if (instructions !== undefined) recipe.instructions = JSON.parse(instructions);
        if (category !== undefined) recipe.category = category;
        if (prepTime !== undefined) recipe.prepTime = prepTime;
        if (cookTime !== undefined) recipe.cookTime = cookTime;
        if (difficulty !== undefined) recipe.difficulty = difficulty;

      if (req.file) {
    const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
            folder: "recipe-sharing"
        }
    );

    recipe.image = result.secure_url;
}

        await recipe.save();

        res.status(200).json({
            message: "Recipe updated successfully",
            recipe
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        if (recipe.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can only delete your own recipes"
            });
        }
        await recipe.deleteOne();
        res.status(200).json({
            message: "Recipe deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



