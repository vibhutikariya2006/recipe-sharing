const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        ingredients: {
            type: [String],
            required: true
        },

        instructions: {
            type: [String],
            required: true
        },

        category: {
            type: String,
            required: true
        },

        image: {
            type: String,
            default: ""
        },

        prepTime: {
            type: Number,
            default: 0
        },

        cookTime: {
            type: Number,
            default: 0
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Easy"
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;