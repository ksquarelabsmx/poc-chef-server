import * as Joi from "joi";

const user = {
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

export const userSchema = { user };
