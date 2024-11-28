const express = require('express');
const cors = require('cors');  // Import CORS middleware
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const staffRoutes = require('./routes/staffRoutes');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();

// Use CORS middleware
app.use(cors({
  origin: '*',  // Specify the frontend's origin (change if necessary)
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,                // Allow cookies/auth headers
}));

app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);

// Other routes
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/customer', customerRoutes);

module.exports = app;
