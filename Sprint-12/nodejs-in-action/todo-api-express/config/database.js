const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/todo-app');
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error('Database connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;
