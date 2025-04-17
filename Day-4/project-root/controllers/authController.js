const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    if (User.findByEmail(email)) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // 12 tours de hash
    const user = User.create({ email, password: hashedPassword });

    res.status(201).json({ 
      success: true,
      user: { id: user.id, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
      success: true,
      token,
      expiresIn: 3600 // 1h en secondes
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};