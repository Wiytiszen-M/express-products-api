const AppError = require("../errors/AppError");

const getFirstZodErrorMessage = (error) => {
  return error.issues[0]?.message || "Invalid request data";
};

const validateRequest = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const message = getFirstZodErrorMessage(result.error);
      throw new AppError(message, 400);
    }

    req[source] = result.data;

    next();
  };
};

module.exports = validateRequest;
