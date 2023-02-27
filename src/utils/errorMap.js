const errorMap = {
  REQUIRED_PROPERTY: 400,
  PROPERTY_FORMAT: 422,
  NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = mapError;