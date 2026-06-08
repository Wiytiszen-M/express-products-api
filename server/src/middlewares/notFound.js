const AppError = require("../errors/AppError");

const notFound = (req, res, next) => {
  const message = `Route ${req.originalUrl} not found`;

  next(new AppError(message, 404));
};

module.exports = notFound;
