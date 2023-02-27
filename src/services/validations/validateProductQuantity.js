module.exports = function validateProductQuantity(sales) {
  const checkQuantityExistence = sales.some((sale) =>
    !sale.quantity && typeof sale.quantity !== 'number');

  const checkQuantityValue = sales.some((sale) => sale.quantity <= 0);

  if (checkQuantityExistence) {
    return { type: 'REQUIRED_PROPERTY', message: '"quantity" is required' };
  }
  if (checkQuantityValue) {
    return { type: 'PROPERTY_FORMAT', message: '"quantity" must be greater than or equal to 1' };
  }

  return { type: null, message: '' };
};