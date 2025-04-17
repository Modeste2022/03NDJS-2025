const { User } = require('../models/User');

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = User.generateAuthToken(user);
        res.status(201).send({ user: { id: user.id, email: user.email }, token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = User.generateAuthToken(user);
        res.send({ token });
    } catch (e) {
        res.status(401).send({ error: e.message });
    }
};

const getMe = async (req, res) => {
    res.send({ user: { id: req.user.id, email: req.user.email } });
};

module.exports = { register, login, getMe };