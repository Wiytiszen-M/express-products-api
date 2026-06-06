const pool = require("../config/database");

const findAll = async () => {
  const result = await pool.query(
    `
      SELECT id, name, created_at
      FROM categories
      ORDER BY name ASC
    `,
  );

  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query(
    `
      SELECT id, name, created_at
      FROM categories
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

const create = async ({ name }) => {
  const result = await pool.query(
    `
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING id, name, created_at
    `,
    [name],
  );

  return result.rows[0];
};

module.exports = {
  findAll,
  findById,
  create,
};
