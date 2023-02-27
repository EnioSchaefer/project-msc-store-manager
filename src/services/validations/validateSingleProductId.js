const getProductIds = require('../../utils/getProductIds');

module.exports = async function validateSingleProductId(id) {
  const ids = await getProductIds();

  const checkId = ids.includes(id);
  if (!checkId) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};