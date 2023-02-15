const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );

  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );

  return result;
};

const insertProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [product],
  );

  return insertId;
};

const updateProductName = async (id, updateName) => {
  const [{ insertId }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [updateName, id],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProductName,
};