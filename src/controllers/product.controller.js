const {
  findProductById,
  addProduct,
  replaceProduct,
  updateProductPartially,
  removeProduct,
  getProducts: getProductsFromService,
} = require("../services/product.service");

const AppError = require("../errors/AppError");
const sendResponse = require("../utils/sendResponse.js");

const getProducts = async (req, res) => {
  const { search, minPrice, page, limit, sortBy, order } = req.query;
  const result = await getProductsFromService({
    search,
    minPrice,
    page,
    limit,
    sortBy,
    order,
  });

  return sendResponse(
    res,
    200,
    "Products retrieved successfully",
    result.data,
    result.meta,
  );
};

const getProductById = (req, res) => {
  const { id } = req.params;

  const product = findProductById(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return sendResponse(res, 200, "Product retrieved successfully", product);
};

const createProduct = (req, res) => {
  const { name, price } = req.body;

  const newProduct = addProduct({ name, price });

  return sendResponse(res, 201, "Product created successfully", newProduct);
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const updatedProduct = replaceProduct(id, { name, price });

  if (!updatedProduct) {
    throw new AppError("Product not found", 404);
  }

  return sendResponse(res, 200, "Product updated successfully", updatedProduct);
};

const patchProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const updatedProduct = updateProductPartially(id, { name, price });

  if (!updatedProduct) {
    throw new AppError("Product not found", 404);
  }

  return sendResponse(
    res,
    200,
    "Product partially updated successfully",
    updatedProduct,
  );
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  const deletedProduct = removeProduct(id);

  if (!deletedProduct) {
    throw new AppError("Product not found", 404);
  }

  return sendResponse(res, 200, "Product deleted successfully", deletedProduct);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
