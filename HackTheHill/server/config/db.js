const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Replace 'your_mongodb_connection_string' with your actual MongoDB URI
        await mongoose.connect('mongodb://localhost:27017/lockedin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB; // Export the connectDB function for use in index.js
