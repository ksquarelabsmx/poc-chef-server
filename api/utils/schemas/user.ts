import * as Joi from "joi";

const userSchema = {
  name: Joi.string()
    .max(15)
    .required(),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(["partner", "partner admin"])
    .required()
};

export { userSchema };
