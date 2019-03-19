import * as Joi from "joi";

const credentialsSchema = {
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi.string().required()
};

export { credentialsSchema };
