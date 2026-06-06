const validateCreateCategory = ({ name }) => {
  if (!name || typeof name !== "string") {
    return "Category name is required and must be a string";
  }

  return null;
};

module.exports = {
  validateCreateCategory,
};
