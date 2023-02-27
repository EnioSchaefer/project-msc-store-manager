const { salesService } = require('../services');
const mapError = require('../utils/errorMap');

const getAllSales = async (req, res) => {
  const { type, message } = await salesService.getAllSales();

  if (type) return res.status(mapError(type)).json(message);

  return res.status(200).json(message);
};

const insertSales = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.insertSales(sales);

  if (type) return res.status(mapError(type)).json({ message });

  const { id } = message;

  const result = { id, itemsSold: sales };

  return res.status(201).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);

  const { type, message } = await salesService.getSaleById(numberId);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);

  const { type, message } = await salesService.deleteSale(numberId);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const updatingSales = req.body;
  const numberId = Number(id);

  const { type, message } = await salesService.updateSales(numberId, updatingSales);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  getAllSales,
  insertSales,
  getSaleById,
  deleteSale,
  updateSale,
};