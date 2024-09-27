const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/chatbot';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Optionally rethrow if you want to handle it later
    }
};

// Call the connection function
module.exports = connectToDatabase
