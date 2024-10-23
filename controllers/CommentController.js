import Comment from "../Models/Comment.js";
import CommentSchema from "../Validator/CommentValidator.js";

export const GetAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const GetCommentById = async (req, res) => {
    let { id } = req.params;
    try {
        const commentById = await Comment.findById(id);
        if (!commentById) {
            return res.status(404).json({
                message: `Aucun commentaire trouvé pour l'id ${id}`,
            });
        }
        return res.status(200).json(commentById);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const GetCommentByUserId = async (req, res) => {
    let { id } = req.params;
    try {
        const comments = await Comment.find({ author: id });
        if (!comments) {
            return res.status(404).json({
                message: `Aucun commentaire trouvé pour l'utilisateur avec l'id ${id}`,
            });
        }
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const GetCommentByPostId = async (req, res) => {
    let { id } = req.params;
    try {
        const comments = await Comment.find({ postId: id });
        if (!comments) {
            return res.status(404).json({
                message: `Aucun commentaire trouvé pour le post avec l'id ${id}`,
            });
        }
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const CreateComment = async (req, res) => {
    let { author, content, postId } = req.body;
    try {
        const { error, value } = CommentSchema.validate({
            author,
            content,
            postId,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newComment = await Comment.create(value);
        return res.status(201).json(newComment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const UpdateComment = async (req, res) => {
    let { id } = req.params;
    let { author, content, postId } = req.body;
    try {
        const { error, value } = CommentSchema.validate({
            author,
            content,
            postId,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, value, {
            new: true,
        });
        if (!updatedComment) {
            return res.status(404).json({
                message: `Aucun commentaire trouvé pour l'id ${id}`,
            });
        }
        return res.status(200).json(updatedComment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const DeleteComment = async (req, res) => {
    let { id } = req.params;
    try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({
                message: `Aucun commentaire trouvé pour l'id ${id}`,
            });
        }
        return res
            .status(200)
            .json({ message: "Commentaire supprimé avec succès" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
