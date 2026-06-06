const validateCreateProduct = ({ name, price, category_id }) => {
  if (!name || typeof name !== "string") {
    return "Product name is required and must be a string";
  }

  if (typeof price !== "number" || price <= 0) {
    return "Product price must be a number greater than 0";
  }

  if (
    category_id === undefined ||
    !Number.isInteger(Number(category_id)) ||
    Number(category_id) <= 0
  ) {
    return "Product category_id is required and must be a positive integer";
  }

  return null;
};

const validateUpdateProduct = ({ name, price, category_id }) => {
  if (!name || typeof name !== "string") {
    return "Product name is required and must be a string";
  }

  if (typeof price !== "number" || price <= 0) {
    return "Product price must be a number greater than 0";
  }

  if (
    category_id !== undefined &&
    (!Number.isInteger(Number(category_id)) || Number(category_id) <= 0)
  ) {
    return "Product category_id must be a positive integer";
  }

  return null;
};

const validatePatchProduct = ({ name, price, category_id }) => {
  if (name !== undefined && typeof name !== "string") {
    return "Product name must be a string";
  }

  if (price !== undefined && (typeof price !== "number" || price <= 0)) {
    return "Product price must be a number greater than 0";
  }

  if (
    category_id !== undefined &&
    (!Number.isInteger(Number(category_id)) || Number(category_id) <= 0)
  ) {
    return "Product category_id must be a positive integer";
  }

  return null;
};

const validateProductQuery = ({ minPrice, page, limit, sortBy, order }) => {
  const allowedSortFields = ["id", "name", "price", "created_at", "category"];
  const allowedOrderValues = ["asc", "desc"];

  if (minPrice !== undefined && Number.isNaN(Number(minPrice))) {
    return "minPrice must be a valid number";
  }

  if (
    page !== undefined &&
    (!Number.isInteger(Number(page)) || Number(page) <= 0)
  ) {
    return "page must be a positive integer";
  }

  if (
    limit !== undefined &&
    (!Number.isInteger(Number(limit)) || Number(limit) <= 0)
  ) {
    return "limit must be a positive integer";
  }

  if (sortBy !== undefined && !allowedSortFields.includes(sortBy)) {
    return "sortBy must be one of: name, price";
  }

  if (order !== undefined && !allowedOrderValues.includes(order)) {
    return "order must be one of: asc, desc";
  }

  return null;
};
module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
  validatePatchProduct,
  validateProductQuery,
};
