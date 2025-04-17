const { User } = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = User.getAll();
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleted = User.delete(parseInt(req.params.id));
        if (!deleted) return res.status(404).send();
        res.send({ message: 'User deleted' });
    } catch (e) {
        res.status(500).send();
    }
};

module.exports = { getAllUsers, deleteUser };