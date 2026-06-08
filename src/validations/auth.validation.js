const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string().min(1, "Email is required").email("Email must be valid"),

  password: z.string().min(6, "Password must have at least 6 characters"),
});

module.exports = {
  registerSchema,
};
