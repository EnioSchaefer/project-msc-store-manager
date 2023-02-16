const express = require('express');
const validateName = require('../middlewares/validateName');
const validateSingleProductId = require('../middlewares/validateSingleProductId');
const { findAll, findById, insertProduct,
  updateProductName, deleteProduct, searchProducts } = require('../models/products.model');

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);

    const searchQuery = q.length > 0 ? `%${q}%` : '%%';

    const searchedProduct = await searchProducts(searchQuery);

    return res.status(200).json(searchedProduct);
  } catch (err) {
    console.log(err);
  }
});

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

router.put('/:id', validateName, validateSingleProductId, async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    await updateProductName(Number(id), name);

    return res.status(200).json({ id, name });
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', validateSingleProductId, async (req, res) => {
  try {
    const { id } = req.params;

    await deleteProduct(Number(id));

    return res.status(204).end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;