const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const {
  validateCreateProductRequest,
  validateUpdateProductRequest,
  validatePatchProductRequest,
  validateProductQueryRequest,
} = require("../middlewares/validateProduct");

const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", validateProductQueryRequest, asyncHandler(getProducts));

router.get("/:id", asyncHandler(getProductById));

router.post("/", validateCreateProductRequest, asyncHandler(createProduct));

router.put("/:id", validateUpdateProductRequest, asyncHandler(updateProduct));

router.patch("/:id", validatePatchProductRequest, asyncHandler(patchProduct));

router.delete("/:id", asyncHandler(deleteProduct));

module.exports = router;
