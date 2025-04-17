const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const { connectDB } = require('./models/User');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));