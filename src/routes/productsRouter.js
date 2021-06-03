const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/search/:searchedProduct', productController.searchByName);
router.post('/', productController.addproduct );
router.put('/:id', productController.updateProduct );
router.delete('/:id', productController.deleteProduct );

module.exports = router;