const { BadRequest } = require("../../errors/error-classes/errorClasses");

const validate = (schema) => async (req, res, next) => {
  //schema is an object that contains body, params, query as optional keys
  for (key in schema) {
    const validationResult = schema[key].validate(req[key]);
    if (validationResult?.error) {
      return next(new BadRequest(validationResult.error.message));
    }
  }
  next();
};
module.exports = validate;
