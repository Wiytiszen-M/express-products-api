const jwt = require("jsonwebtoken");

const AppError = require("../errors/AppError");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Authentication token is required", 401);
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new AppError("Invalid authorization format", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
};

module.exports = authMiddleware;
