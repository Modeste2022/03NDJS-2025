const User = require('../models/User');

exports.getMe = (req, res) => {
  try {
    const { password, ...userData } = req.user;
    res.json({ success: true, user: userData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user data' });
  }
};

exports.getAllUsers = (req, res) => {
  try {
    const users = User.getAll();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const deletedUser = User.delete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
};