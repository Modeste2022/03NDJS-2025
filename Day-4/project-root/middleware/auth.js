const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');
const { User } = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error();
        
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = User.findById(decoded.id);
        if (!user) throw new Error();
        
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

const adminAuth = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.isAdmin) return next();
        res.status(403).send({ error: 'Admin access required' });
    });
};

module.exports = { auth, adminAuth };