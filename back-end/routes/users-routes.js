const express = require('express');

const {
  getUsers, 
  getUser, 
  deleteUser,
  addUser,
  updateUser,
	getCart,
  getWishItems
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
router.get('/users/:id', getWishItems);


module.exports = router;