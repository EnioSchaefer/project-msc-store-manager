const express = require('express');
const validateName = require('../middlewares/validateName');
const validateUpdateId = require('../middlewares/validateUpdateId');
const { findAll, findById, insertProduct, updateProductName } = require('../models/products.model');

const router = express.Router();

router.get('/', async (_req, res) => res.status(200).json(await findAll()));

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await findById(id);
    if (result) return res.status(200).json(result);
    return res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    console.log(err);
  }
});

router.post('/', validateName, async (req, res) => {
  try {
    const { name } = req.body;

    const insertId = await insertProduct(name);

    return res.status(201).json({ id: insertId, name });
  } catch (err) {
    console.log(err);
  }
});

router.put('/:id', validateName, validateUpdateId, async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    await updateProductName(Number(id), name);

    return res.status(200).json({ id, name });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;