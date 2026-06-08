const AppError = require("../errors/AppError");

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError("User is not authenticated", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError(
        "You do not have permission to perform this action",
        403,
      );
    }

    next();
  };
};

module.exports = authorizeRoles;
