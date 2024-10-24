import Joi from "joi";

const PasswordSchema = Joi.object({
    password: Joi.string().min(3).max(30).required(),
});

export default PasswordSchema;
