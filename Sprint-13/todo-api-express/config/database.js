const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}${process.env.MONGODB_DB_NAME}`);
        console.log('='.repeat(50));
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
        console.log('='.repeat(50));
        
    } catch (error) {
        logger.error('Database connection error:', error);
        process.exit(1);
    }
}

mongoose.connection.on('disconnected', () => {
    logger.info('MongoDB disconnected!');
})

mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error:', err);
});


module.exports = connectDB;
