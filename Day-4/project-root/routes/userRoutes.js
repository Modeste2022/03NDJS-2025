const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { getAllUsers, deleteUser } = require('../controllers/userController');
router.use(authenticate);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
module.exports = router;