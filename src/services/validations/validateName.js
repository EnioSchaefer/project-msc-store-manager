module.exports = function validateName(productName) {
  if (!productName) {
    return {
      type: 'REQUIRED_PROPERTY', message: '"name" is required',
    };
  }
  if (productName.length < 5) {
    return { type: 'PROPERTY_FORMAT', message: '"name" length must be at least 5 characters long' };
  }

  return { type: null, message: '' };
};