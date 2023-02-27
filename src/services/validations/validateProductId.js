const getProductIds = require('../../utils/getProductIds');

module.exports = async function validateProductId(sales) {
  const ids = await getProductIds();

  const checkIdsExistence = sales.some((sale) =>
    !sale.productId && typeof sale.productId !== 'number');
  const checkIdsOnDatabase = sales.every((sale) => ids.includes(sale.productId));

  if (checkIdsExistence) return { type: 'REQUIRED_PROPERTY', message: '"productId" is required' };
  if (!checkIdsOnDatabase) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { tpe: null, message: '' };
};