import mongoose from 'mongoose'

// Connect to the MongoDB database
const ConnectDB = async () => {
    try {
        mongoose.connection.on('connected', () =>
            console.log('✅ MongoDB connected successfully')
        );

        await mongoose.connect(`${process.env.MONGODB_URI}/lms`);
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default ConnectDB;
