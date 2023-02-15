const express = require('express');
const validateProductId = require('../middlewares/validateProductId');
const validateProductQuantity = require('../middlewares/validateProductQuantity');
const validateSaleId = require('../middlewares/validateSaleId');
const { insertSales, getAllSales, getSaleById } = require('../models/sales.model');

const router = express.Router();

router.post('/', validateProductQuantity, validateProductId, async (req, res) => {
  try {
    const sales = req.body;
    const id = await insertSales(sales);

    const result = { id, itemsSold: sales };

    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (_req, res) => {
  try {
    const allSales = await getAllSales();

    return res.status(200).json(allSales);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', validateSaleId, async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await getSaleById(Number(id));

    return res.status(200).json(sale);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;