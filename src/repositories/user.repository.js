const pool = require("../config/database");

const findByEmail = async (email) => {
  const result = await pool.query(
    `
    SELECT id, name,email, password,role, created_at
    FROM users
    WHERE email = $1
`,
    [email],
  );

  return result.rows[0];
};

const create = async ({ name, email, password }) => {
  const result = await pool.query(
    `
    INSERT INTO users (name,email,password)
    VALUES ($1,$2, $3)
    RETURNING id,name email,role, created_at
    `,
    [name, email, password],
  );

  return result.rows[0];
};

module.exports = {
  findByEmail,
  create,
};
