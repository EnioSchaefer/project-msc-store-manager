const { productsService } = require('../services');
const mapError = require('../utils/errorMap');

const searchProducts = async (req, res) => {
  const { q } = req.query;

  const searchQuery = q.length > 0 ? `%${q}%` : '%%';

  const { type, message } = await productsService.searchProducts(searchQuery);

  if (type) return res.status(mapError(type)).json(message);

  return res.status(200).json(message);
};

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(mapError(type)).json(message);

  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);

  const { type, message } = await productsService.findById(numberId);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.insertProduct(name);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const numberId = Number(id);

  const { type, message } = await productsService.updateProductName(numberId, name);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);

  const { type, message } = await productsService.deleteProduct(numberId);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).end();
};

module.exports = {
  listProducts,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};