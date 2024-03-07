const { HTTP_CODE } = require("../services/errorCodes");
const errorHandler = async (error, req, res, next) => {
  debugger;
  const statusCode = HTTP_CODE.INTERNAL_SERVER_ERROR;

  // NOTE: here we can have different classes for different errors. ApiError, PermissionDeniedError
  console.error(error);

  res.status(statusCode).json({ error: error.message });
};
module.exports = { errorHandler };
