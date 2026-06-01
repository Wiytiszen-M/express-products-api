const pool = require("../config/database");

const findAll = async () => {
  const result = await pool.query(
    "SELECT id, name, price, created_at FROM products ORDER BY id ASC ",
  );
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query(
    "SELECT id, name, price, created_at FROM products WHERE  id = $1",
    [id],
  );
  return result.rows;
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
  findById,
  create,
  replaceById,
  updateById,
  deleteById,
};
