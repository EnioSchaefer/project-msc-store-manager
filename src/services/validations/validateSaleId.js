const getSalesIds = require('../../utils/getSalesIds');

module.exports = async function validateSaleId(id) {
  const ids = await getSalesIds();

  const checkIds = ids.includes(id);

  if (!checkIds) return { type: 'NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: '' };
};