const express = require("express");

const { register, login } = require("../controllers/auth.controller");

const validateRequest = require("../middlewares/validateRequest");
const asyncHandler = require("../utils/asyncHandler");

const {
  registerSchema,
  loginSchema,
} = require("../validations/auth.validation");

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerSchema, "body"),
  asyncHandler(register),
);

router.post(
  "/login",
  validateRequest(loginSchema, "body"),
  asyncHandler(login),
);

module.exports = router;
