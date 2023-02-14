const express = require('express');
const { findAll } = require('../models/products.model');

const router = express.Router();

router.get('/', async (_req, res) => res.status(200).json(await findAll()));

module.exports = router;