import * as Joi from "joi";

const credentials = {
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi.string().required()
};

export const credentialsSchema = { credentials };
