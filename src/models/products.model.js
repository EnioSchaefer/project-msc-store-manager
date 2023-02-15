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

const deleteProduct = async (productId) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [productId],
  );

  return 204;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProductName,
  deleteProduct,
};