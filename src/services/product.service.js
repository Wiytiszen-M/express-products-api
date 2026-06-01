const {
  findAll,
  findById,
  create,
  replaceById,
  updateById,
  deleteById,
} = require("../repository/product.repository");

const getAllProducts = async () => {
  return findAll();
};

const getAllProductsAsync = async () => {
  return findAll();
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

const filterProducts = async ({ search, minPrice }) => {
  let filteredProducts = await findAll();

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => Number(product.price) >= Number(minPrice),
    );
  }

  return filteredProducts;
};

const paginateProducts = ({ products, page, limit }) => {
  const currentPage = Number(page) || 1;
  const itemsPerPage = Number(limit) || 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProducts = products.slice(startIndex, endIndex);

  return {
    data: paginatedProducts,
    meta: {
      page: currentPage,
      limit: itemsPerPage,
      totalItems: products.length,
      totalPages: Math.ceil(products.length / itemsPerPage),
    },
  };
};

const sortProducts = ({ products, sortBy, order = "asc" }) => {
  if (!sortBy) {
    return products;
  }

  const sortedProducts = [...products];

  sortedProducts.sort((a, b) => {
    if (sortBy === "price") {
      return order === "desc" ? b.price - a.price : a.price - b.price;
    }

    if (sortBy === "name") {
      return order === "desc"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    }

    return 0;
  });

  return sortedProducts;
};

module.exports = {
  getAllProducts,
  findProductById,
  filterProducts,
  addProduct,
  replaceProduct,
  updateProductPartially,
  removeProduct,
  paginateProducts,
  getAllProductsAsync,
  sortProducts,
};
