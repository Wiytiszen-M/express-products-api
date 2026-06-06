const categoryRepository = require("../repositories/category.repository");

const getCategories = async () => {
  return categoryRepository.findAll();
};

const findCategoryById = async (id) => {
  return categoryRepository.findById(id);
};

const addCategory = async ({ name }) => {
  return categoryRepository.create({ name });
};

module.exports = {
  getCategories,
  findCategoryById,
  addCategory,
};
