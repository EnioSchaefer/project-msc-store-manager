const connection = require('../models/connection');

module.exports = async function validateSaleId(req, res, next) {
  const { id } = req.params;
  const [results] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [Number(id)],
  );

  if (results.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return next();
};