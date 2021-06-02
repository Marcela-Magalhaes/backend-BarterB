const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:id', userController.getUserById);
router.post('/createUser', userController.addUser);
router.post('/login', userController.userLogin );
router.put('/:id', userController.updateUser );
router.delete('/:id', userController.deleteUser);

module.exports = router;