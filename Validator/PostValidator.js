import Joi from "joi";

const PostSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    body: Joi.string().min(10).max(1000).required(),
    userId: Joi.string().hex().length(24).required(),
});

export default PostSchema;
