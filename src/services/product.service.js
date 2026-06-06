const {
  findAll,
  findById,
  create,
  replaceById,
  updateById,
  deleteById,
  countAll,
} = require("../repositories/product.repository");
const categoryRepository = require("../repositories/category.repository");
const AppError = require("../errors/AppError");

const getProducts = async ({
  search,
  minPrice,
  sortBy,
  order,
  page,
  limit,
}) => {
  const currentPage = Number(page) || 1;
  const itemsPerPage = Number(limit) || 5;

  const products = await findAll({
    search,
    minPrice,
    sortBy,
    order,
    page: currentPage,
    limit: itemsPerPage,
  });

  const totalItems = await countAll({
    search,
    minPrice,
  });

  return {
    data: products,
    meta: {
      page: currentPage,
      limit: itemsPerPage,
      totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
    },
  };
};

const findProductById = async (id) => {
  return findById(id);
};

const addProduct = async ({ name, price, category_id }) => {
  const category = await categoryRepository.findById(category_id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return create({
    name,
    price,
    category_id,
  });
};

const replaceProduct = async (id, { name, price, category_id }) => {
  const category = await categoryRepository.findById(category_id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return replaceById(id, {
    name,
    price,
    category_id,
  });
};

const updateProductPartially = async (id, { name, price, category_id }) => {
  return updateById(id, { name, price, category_id });
};

const removeProduct = async (id) => {
  return deleteById(id);
};

module.exports = {
  getProducts,
  findProductById,
  addProduct,
  replaceProduct,
  updateProductPartially,
  removeProduct,
};
