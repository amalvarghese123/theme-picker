const joi = require("joi");

const setThemeSchema = {
  body: joi.object({
    theme: joi.string().valid("light", "dark", "pink", "orange").required(),
  }),
};
module.exports = { setThemeSchema };
