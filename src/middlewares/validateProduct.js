const {
  validateCreateProduct,
  validateUpdateProduct,
  validatePatchProduct,
  validateProductQuery,
} = require("../validations/product.validation");

const AppError = require("../errors/AppError");

const validateProductQueryRequest = (req, res, next) => {
  const { minPrice, page, limit, sortBy, order } = req.query;

  const validationError = validateProductQuery({
    minPrice,
    page,
    limit,
    sortBy,
    order,
  });

  if (validationError) {
    throw new AppError(validationError, 400);
  }

  next();
};

const validateCreateProductRequest = (req, res, next) => {
  const { name, price } = req.body;

  const validationError = validateCreateProduct({ name, price });

  if (validationError) {
    throw new AppError(validationError, 400);
  }

  next();
};

const validateUpdateProductRequest = (req, res, next) => {
  const { name, price } = req.body;

  const validationError = validateUpdateProduct({ name, price });

  if (validationError) {
    throw new AppError(validationError, 400);
  }

  next();
};

const validatePatchProductRequest = (req, res, next) => {
  const { name, price } = req.body;

  const validationError = validatePatchProduct({ name, price });

  if (validationError) {
    throw new AppError(validationError, 400);
  }

  next();
};

module.exports = {
  validateCreateProductRequest,
  validateUpdateProductRequest,
  validatePatchProductRequest,
  validateProductQueryRequest,
};
