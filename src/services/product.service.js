const {
  findAll,
  findById,
  create,
  replaceById,
  updateById,
  deleteById,
  countAll,
} = require("../repository/product.repository");

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

const addProduct = async ({ name, price }) => {
  return create({ name, price });
};

const replaceProduct = async (id, { name, price }) => {
  return replaceById(id, { name, price });
};

const updateProductPartially = async (id, { name, price }) => {
  return updateById(id, { name, price });
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
