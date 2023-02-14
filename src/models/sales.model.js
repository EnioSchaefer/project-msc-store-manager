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

module.exports = {
  insertSales,
};