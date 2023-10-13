const express = require('express');

const {
  getUsers, 
  getUser, 
  deleteUser,
  addUser,
  updateUser,
	getCart,
    // addCart,
    // updateCart,
    // deleteCart
} = require('../controllers/users-controller');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.delete('/users/:id', deleteUser);
router.post('/users', addUser);
router.put('/users/:id', updateUser);

router.get('/users/:id', getCart);


module.exports = router;