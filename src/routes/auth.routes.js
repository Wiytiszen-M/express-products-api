const express = require("express");

const { register } = require("../controllers/auth.controller");

const validateRequest = require("../middlewares/validateRequest");
const asyncHandler = require("../utils/asyncHandler");

const { registerSchema } = require("../validations/auth.validation");

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerSchema, "body"),
  asyncHandler(register),
);

module.exports = router;
