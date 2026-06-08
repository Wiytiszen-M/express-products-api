const express = require("express");
const validateRequest = require("../middlewares/validateRequest");

const { createCategorySchema } = require("../validations/category.validation");

const asyncHandler = require("../utils/asyncHandler");
const {
  getCategories,
  getCategoryById,
  createCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.get("/", asyncHandler(getCategories));

router.get("/:id", asyncHandler(getCategoryById));

router.post(
  "/",
  validateRequest(createCategorySchema, "body"),
  asyncHandler(createCategory),
);

module.exports = router;
