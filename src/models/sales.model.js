const camelize = require('camelize');
const connection = require('./connection');

const insertSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  sales.forEach(async (sale) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, sale.productId, sale.quantity],
    );
  });

  return insertId;
};

const getAllSales = async () => {
  const [results] = await connection.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date FROM sales_products AS sp
    LEFT JOIN sales AS s ON s.id = sp.sale_id ORDER BY sp.sale_id, sp.product_id`,
  );

  return camelize(results);
};

const getSaleById = async (saleId) => {
  const [results] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
    FROM sales_products AS sp
    LEFT JOIN sales AS s ON s.id = sp.sale_id 
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id`,
    [saleId],
  );

  console.log(results);
  return camelize(results);
};

module.exports = {
  insertSales,
  getAllSales,
  getSaleById,
};