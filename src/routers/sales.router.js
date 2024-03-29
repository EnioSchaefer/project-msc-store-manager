const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.post('/', salesController.insertSales);
router.get('/:id', salesController.getSaleById);
router.delete('/:id', salesController.deleteSale);
router.put('/:id', salesController.updateSale);

module.exports = router;