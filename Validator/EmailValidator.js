import Joi from "joi";

const EmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export default EmailSchema;
