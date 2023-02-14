const express = require('express');
const { findAll, findById } = require('../models/products.model');

const router = express.Router();

router.get('/', async (_req, res) => res.status(200).json(await findAll()));

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await findById(id);
  if (result) return res.status(200).json(result);
  return res.status(404).json({ message: 'Product not found' });
});

module.exports = router;