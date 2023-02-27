const { productsModel } = require('../models');
const validateName = require('./validations/validateName');
const validateSingleProductId = require('./validations/validateSingleProductId');

const findAll = async () => {
  const products = await productsModel.findAll();

  return { type: null, message: products };
};

const findById = async (productId) => {
  const idValidation = await validateSingleProductId(productId);
  if (idValidation.type) return idValidation;

  const product = await productsModel.findById(productId);

  return { type: null, message: product };
};

const insertProduct = async (productName) => {
  const nameValidation = await validateName(productName);
  if (nameValidation.type) return nameValidation;

  const id = await productsModel.insertProduct(productName);

  return { type: null, message: { id, name: productName } };
};

const updateProductName = async (id, updateName) => {
  const nameValidation = await validateName(updateName);
  const idValidation = await validateSingleProductId(id);

  if (nameValidation.type) return nameValidation;
  if (idValidation.type) return idValidation;

  await productsModel.updateProductName(id, updateName);

  return { type: null, message: { id, name: updateName } };
};

const deleteProduct = async (id) => {
  const idValidation = await validateSingleProductId(id);

  if (idValidation.type) return idValidation;

  await productsModel.deleteProduct(id);

  return { type: null, message: '' };
};

const searchProducts = async (search) => {
  const searchedProduct = await productsModel.searchProducts(search);

  return { type: null, message: searchedProduct };
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProductName,
  deleteProduct,
  searchProducts,
};