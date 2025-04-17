const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/users');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/users', auth, getAllUsers);
router.delete('/users/:id', auth, deleteUser);

module.exports = router;