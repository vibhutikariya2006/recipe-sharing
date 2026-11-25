const Comment = require("../models/comment");
const Recipe = require("../models/Recipe");

exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const recipeId = req.params.recipeId;

        if (!text) {
            return res.status(400).json({
                message: "Comment cannot be empty"
            });
        }

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }
        const newComment = new Comment({
            text: text,
            user: req.user._id,
            recipe: recipeId
        });
        await newComment.save();
        res.status(201).json({
            message: "Comment added successfully",
            comment: newComment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.getComments = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const comments = await Comment.find({
            recipe: recipeId
        }).populate("user", "username");
        res.status(200).json({
            comments: comments
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }
        if (
            comment.user.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "You are not allowed to delete this comment"
            });
        }
        await comment.deleteOne();
        res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


