const mongoose = require('mongoose');

async function connect() {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGO_URI is not set');
    }

    try {
        await mongoose.connect(mongoUri, {});
        console.log('Connected to MongoDB');
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async function disconnect() {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
        throw error;
    }
}

module.exports = { connect, disconnect };
