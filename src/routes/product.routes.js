const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

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
  authorizeRoles("admin"),
  validateRequest(createProductSchema, "body"),
  asyncHandler(createProduct),
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validateRequest(updateProductSchema, "body"),
  asyncHandler(updateProduct),
);

router.patch(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validateRequest(patchProductSchema, "body"),
  asyncHandler(patchProduct),
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  asyncHandler(deleteProduct),
);

module.exports = router;
