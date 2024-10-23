import Comment from "../Models/Comment.js";

export const GetAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const GetCommentById = async (req, res) => {
    try {
        const commentById = await Comment.findById(req.params.id);
        if (!commentById) {
            return res.status(404).json({ message: "Comment not found" });
        }
        return res.status(200).json(commentById);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const CreateComment = async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const UpdateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const DeleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
