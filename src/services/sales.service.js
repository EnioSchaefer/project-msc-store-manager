const { salesModel } = require('../models');
const validateProductId = require('./validations/validateProductId');
const validateProductQuantity = require('./validations/validateProductQuantity');
const validateSaleId = require('./validations/validateSaleId');

const getAllSales = async () => {
  const products = await salesModel.getAllSales();

  return { type: null, message: products };
};

const getSaleById = async (id) => {
  const idValidation = await validateSaleId(id);

  if (idValidation.type) return idValidation;

  const sale = await salesModel.getSaleById(id);

  return { type: null, message: sale };
};

const insertSales = async (sales) => {
  const productIdValidation = await validateProductId(sales);
  const productQuantityValidation = await validateProductQuantity(sales);

  if (productIdValidation.type) return productIdValidation;
  if (productQuantityValidation.type) return productQuantityValidation;

  const saleId = await salesModel.insertSales(sales);

  return { type: null, message: { id: saleId, itemsSold: sales } };
};

const updateSales = async (saleId, updatingSale) => {
  const saleIdValidation = await validateSaleId(saleId);
  const productIdValidation = await validateProductId(updatingSale);
  const productQuantityValidation = await validateProductQuantity(updatingSale);

  if (saleIdValidation.type) return saleIdValidation;
  if (productIdValidation.type) return productIdValidation;
  if (productQuantityValidation.type) return productQuantityValidation;

  const updatedSales = await salesModel.updateSales(saleId, updatingSale);

  return { type: null, message: { saleId, itemsUpdated: updatedSales } };
};

const deleteSale = async (saleId) => {
  const saleIdValidation = await validateSaleId(saleId);

  if (saleIdValidation.type) return saleIdValidation;

  await salesModel.deleteSale(saleId);

  return { type: null, message: '' };
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSales,
  updateSales,
  deleteSale,
};