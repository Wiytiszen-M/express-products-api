const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

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
  authMiddleware,
  validateRequest(createProductSchema, "body"),
  asyncHandler(createProduct),
);

router.put(
  "/:id",
  authMiddleware,
  validateRequest(updateProductSchema, "body"),
  asyncHandler(updateProduct),
);

router.patch(
  "/:id",
  authMiddleware,
  validateRequest(patchProductSchema, "body"),
  asyncHandler(patchProduct),
);

router.delete("/:id", authMiddleware, asyncHandler(deleteProduct));

module.exports = router;
