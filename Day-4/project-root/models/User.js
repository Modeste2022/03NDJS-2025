const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

let users = [];
let nextId = 1;

class User {
    static async create({ email, password }) {
        const exists = users.some(u => u.email === email);
        if (exists) throw new Error('Email already exists');
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: nextId++, email, password: hashedPassword };
        users.push(user);
        return user;
    }

    static async findByCredentials(email, password) {
        const user = users.find(u => u.email === email);
        if (!user) throw new Error('Invalid credentials');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');
        
        return user;
    }

    static generateAuthToken(user) {
        return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    }

    static findById(id) {
        return users.find(u => u.id === id);
    }

    static getAll() {
        return users.map(u => ({ id: u.id, email: u.email }));
    }

    static delete(id) {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return false;
        users.splice(index, 1);
        return true;
    }
}

module.exports = { User, connectDB: () => console.log('Using in-memory storage') };