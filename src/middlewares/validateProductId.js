const getProductIds = require('../utils/getProductIds');

module.exports = async function validateProductId(req, res, next) {
  const sales = req.body;

  const ids = await getProductIds();

  const checkIdsExistence = sales.some((sale) =>
    !sale.productId && typeof sale.productId !== 'number');
  const checkIdsOnDatabase = sales.every((sale) => ids.includes(sale.productId));

  if (checkIdsExistence) return res.status(400).json({ message: '"productId" is required' });
  if (!checkIdsOnDatabase) return res.status(404).json({ message: 'Product not found' });
  return next();
};