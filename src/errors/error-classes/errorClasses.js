const ApiError = require("./apiError");

class DocumentAlreadyExist extends ApiError {
  constructor(message) {
    super({ message, statusCode: 409, code: "DOCUMENT_ALREADY_EXIST" });
  }
}
class DocumentNotFound extends ApiError {
  constructor(message) {
    super({ message, statusCode: 404, code: "DOCUMENT_NOT_FOUND" });
  }
}
class RouteNotFound extends ApiError {
  constructor(message) {
    super({ message, statusCode: 404, code: "ROUTE_NOT_FOUND" });
  }
}
class BadRequest extends ApiError {
  constructor(message) {
    super({ message, statusCode: 400, code: "BAD_REQUEST" });
  }
}
class Unauthorized extends ApiError {
  constructor(message) {
    super({ message, statusCode: 401, code: "UNAUTHORIZED" });
  }
}
module.exports = {
  DocumentAlreadyExist,
  DocumentNotFound,
  BadRequest,
  Unauthorized,
  RouteNotFound,
};
