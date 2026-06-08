const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const validateRequest = require("../middlewares/validateRequest");

const {
  createProductSchema,
  updateProductSchema,
  patchProductSchema,
  productQuerySchema,
} = require("../validations/product.validation");

const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get(
  "/",
  validateRequest(productQuerySchema, "query"),
  asyncHandler(getProducts),
);

router.get("/:id", asyncHandler(getProductById));

router.post(
  "/",
  validateRequest(createProductSchema, "body"),
  asyncHandler(createProduct),
);

router.put(
  "/:id",
  validateRequest(updateProductSchema, "body"),
  asyncHandler(updateProduct),
);

router.patch(
  "/:id",
  validateRequest(patchProductSchema, "body"),
  asyncHandler(patchProduct),
);

router.delete("/:id", asyncHandler(deleteProduct));

module.exports = router;
