import Joi from "joi";

const CommentSchema = Joi.object({
    author: Joi.string().hex().length(24).required(),
    content: Joi.string().min(1).max(500).required(),
    postId: Joi.string().hex().length(24).required(),
});

export default CommentSchema;
