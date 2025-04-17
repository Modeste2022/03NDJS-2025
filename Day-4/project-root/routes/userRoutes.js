const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { getMe, getAllUsers, deleteUser } = require('../controllers/userController');

router.get('/me', authenticate, getMe);
router.get('/', authenticate, getAllUsers);
router.delete('/:id', authenticate, deleteUser);

module.exports = router;