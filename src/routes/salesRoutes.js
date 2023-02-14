const express = require('express');
const { insertSales } = require('../models/sales.model');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const sales = req.body;
    const id = await insertSales(sales);

    const result = { id, itemsSold: sales };

    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;