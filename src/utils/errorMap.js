const errorMap = {
  REQUIRED_PROPERTY: 400,
  PROPERTY_FORMAT: 422,
  NOT_FOUND: 404,
};

module.exports = function mapError(type) { return errorMap[type] || 500; };