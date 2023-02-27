const connection = require('../models/connection');

module.exports = async function getSalesIds() {
  const [rawIds] = await connection.execute(
    'SELECT id FROM sales',
  );

  const ids = rawIds.map((id) => id.id);
  return ids;
};