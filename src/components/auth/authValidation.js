const joi = require("joi");

const registerUserSchema = {
  body: joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().required(),
    password: joi.string().required(),
  }),
};
const loginUserSchema = {
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};
module.exports = { registerUserSchema, loginUserSchema };
