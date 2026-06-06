const pool = require("../config/database");

const buildProductFilters = ({ search, minPrice } = {}) => {
  const values = [];
  const conditions = [];

  if (search) {
    values.push(`%${search}%`);
    conditions.push(`products.name ILIKE $${values.length}`);
  }

  if (minPrice) {
    values.push(Number(minPrice));
    conditions.push(`products.price >= $${values.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  return {
    whereClause,
    values,
  };
};

const findAll = async ({
  search,
  minPrice,
  sortBy = "id",
  order = "asc",
  page = 1,
  limit = 5,
} = {}) => {
  const { whereClause, values } = buildProductFilters({
    search,
    minPrice,
  });

  const allowedSortFields = {
    id: "products.id",
    name: "products.name",
    price: "products.price",
    created_at: "products.created_at",
    category: "categories.name",
  };

  const safeSortBy = allowedSortFields[sortBy] || "products.id";

  const safeOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

  const currentPage = Number(page) || 1;
  const itemsPerPage = Number(limit) || 5;
  const offset = (currentPage - 1) * itemsPerPage;

  const queryValues = [...values];

  queryValues.push(itemsPerPage);
  const limitPlaceholder = `$${queryValues.length}`;

  queryValues.push(offset);
  const offsetPlaceholder = `$${queryValues.length}`;

  const result = await pool.query(
    `
    SELECT
      products.id,
      products.name,
      products.price,
      products.category_id,
      categories.name AS category_name,
      products.created_at
    FROM products
    JOIN categories
      ON products.category_id = categories.id
    ${whereClause}
    ORDER BY ${safeSortBy} ${safeOrder}
    LIMIT ${limitPlaceholder}
    OFFSET ${offsetPlaceholder}
  `,
    queryValues,
  );

  return result.rows;
};

const countAll = async ({ search, minPrice } = {}) => {
  const { whereClause, values } = buildProductFilters({
    search,
    minPrice,
  });

  const result = await pool.query(
    `
      SELECT COUNT(*) AS total
      FROM products
      JOIN categories
        ON products.category_id = categories.id
      ${whereClause}
    `,
    values,
  );

  return Number(result.rows[0].total);
};

const findById = async (id) => {
  const result = await pool.query(
    `
      SELECT
        products.id,
        products.name,
        products.price,
        products.category_id,
        categories.name AS category_name,
        products.created_at
      FROM products
      JOIN categories
        ON products.category_id = categories.id
      WHERE products.id = $1
    `,
    [id],
  );

  return result.rows[0];
};

const create = async ({ name, price }) => {
  const result = await pool.query(
    `
    INSERT INTO products (name,price)
    VALUES ($1 $2)
    RETURNING id, name, price, created_at
    `,
    [name, price],
  );

  return result.rows[0];
};

const replaceById = async (id, { name, price }) => {
  const result = await pool.query(
    `
    UPDATE products
    SET name = $1
        price =  $2
    WHERE id = $3
    RETURNING id, name , price, created_at
    `,
    [name, price, id],
  );
  return result.rows[0];
};

const updateById = async (id, { name, price }) => {
  const currentProduct = await findById(id);

  if (!currentProduct) {
    return null;
  }

  const updatedName = name !== undefined ? name : currentProduct.name;
  const updatedPrice = price !== undefined ? price : currentProduct.price;

  const result = await pool.query(
    `
      UPDATE products
      SET name = $1,
          price = $2
      WHERE id = $3
      RETURNING id, name, price, created_at
    `,
    [updatedName, updatedPrice, id],
  );

  return result.rows[0];
};

const deleteById = async (id) => {
  const result = await pool.query(
    `
      DELETE FROM products
      WHERE id = $1
      RETURNING id, name, price, created_at
    `,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  findAll,
  countAll,
  findById,
  create,
  replaceById,
  updateById,
  deleteById,
};
