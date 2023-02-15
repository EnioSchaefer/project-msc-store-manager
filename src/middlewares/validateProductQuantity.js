module.exports = function validateProductQuantity(req, res, next) {
  const sales = req.body;

  const checkQuantityExistence = sales.some((sale) =>
    !sale.quantity && typeof sale.quantity !== 'number');
  const checkQuantityValue = sales.some((sale) => sale.quantity <= 0);

  if (checkQuantityExistence) return res.status(400).json({ message: '"quantity" is required' });
  if (checkQuantityValue) {
    return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};