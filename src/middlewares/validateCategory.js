const AppError = require("../errors/AppError");

const {
  validateCreateCategory,
} = require("../validations/category.validation");

const validateCreateCategoryRequest = (req, res, next) => {
  const { name } = req.body;

  const validationError = validateCreateCategory({ name });

  if (validationError) {
    throw new AppError(validationError, 400);
  }

  next();
};

module.exports = {
  validateCreateCategoryRequest,
};
