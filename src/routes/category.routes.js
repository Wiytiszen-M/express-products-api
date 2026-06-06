const express = require("express");

const {
  validateCreateCategoryRequest,
} = require("../middlewares/validateCategory");

const asyncHandler = require("../utils/asyncHandler");
const {
  getCategories,
  getCategoryById,
  createCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.get("/", asyncHandler(getCategories));

router.get("/:id", asyncHandler(getCategoryById));

router.post("/", validateCreateCategoryRequest, asyncHandler(createCategory));

module.exports = router;
