require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel'); // Adjust path if needed
const connectDB = require('./config/db');

connectDB();

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'Admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit();
    }

    const adminData = {
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'adminpassword123',
      role: 'Admin'
    };

    const admin = new User(adminData);
    await admin.save();

    console.log('Admin user created:', admin);
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
