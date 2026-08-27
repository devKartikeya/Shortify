const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log('Connected successfully with the Database');
  } catch (err) {
    console.error('Failed to connect with the Database:', err);
    process.exit(1);
  }
};

module.exports = connectDB;