const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', categoryController.getAllCategories );
router.get('/:id', categoryController.getCategoryById);
router.get('/category/:categoryName', categoryController.getProductsByCategory);
router.post('/', categoryController.addCategory );
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;