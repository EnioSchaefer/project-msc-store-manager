const connection = require('../models/connection');

module.exports = async function getProductIds() {
  const [rawIds] = await connection.execute(
    'SELECT id FROM products',
  );

  const ids = rawIds.map((id) => id.id);
  return ids;
};