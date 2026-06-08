const {
  getCategories: getCategoriesFromService,
  findCategoryById,
  addCategory,
} = require("../services/category.service");

const AppError = require("../errors/AppError");
const sendResponse = require("../utils/sendResponse");

const getCategories = async (req, res) => {
  const categories = await getCategoriesFromService();

  return sendResponse(
    res,
    200,
    "Categories retrieved successfully",
    categories,
  );
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await findCategoryById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return sendResponse(res, 200, "Category retrieved successfully", category);
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  const newCategory = await addCategory({ name });

  return sendResponse(res, 201, "Category created successfully", newCategory);
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
};
