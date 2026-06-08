const { z } = require("zod");

const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Product price must be a number greater than 0"),
  category_id: z
    .number()
    .int("Product category_id must be an integer")
    .positive("Product category_id must be a positive integer"),
});

const updateProductSchema = createProductSchema;

const patchProductSchema = createProductSchema.partial();

const productQuerySchema = z.object({
  search: z.string().optional(),

  minPrice: z
    .string()
    .optional()
    .refine((value) => value === undefined || !Number.isNaN(Number(value)), {
      message: "minPrice must be a valid number",
    }),

  page: z
    .string()
    .optional()
    .refine(
      (value) =>
        value === undefined ||
        (Number.isInteger(Number(value)) && Number(value) > 0),
      {
        message: "page must be a positive integer",
      },
    ),

  limit: z
    .string()
    .optional()
    .refine(
      (value) =>
        value === undefined ||
        (Number.isInteger(Number(value)) && Number(value) > 0),
      {
        message: "limit must be a positive integer",
      },
    ),

  sortBy: z.enum(["id", "name", "price", "created_at", "category"]).optional(),

  order: z.enum(["asc", "desc"]).optional(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  patchProductSchema,
  productQuerySchema,
};
