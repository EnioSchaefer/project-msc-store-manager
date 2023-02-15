const getProductIds = require('../utils/getProductIds');

module.exports = async function validateUpdateId(req, res, next) {
  const { id } = req.params;

  const ids = await getProductIds();

  const checkId = ids.includes(Number(id));
  if (!checkId) return res.status(404).json({ message: 'Product not found' });

  return next();
};