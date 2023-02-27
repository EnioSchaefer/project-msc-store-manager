const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/search', productsController.searchProducts);
router.get('/', productsController.listProducts);
router.get('/:id', productsController.getProduct);
router.post('/', productsController.insertProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;