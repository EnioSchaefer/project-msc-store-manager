const connection = require('../models/connection');

module.exports = async function validateSaleId(req, res, next) {
  const { id } = req.params;
  const [results] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
    FROM sales_products AS sp
    LEFT JOIN sales AS s ON s.id = sp.sale_id 
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id`,
    [Number(id)],
  );

  if (results.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return next();
};