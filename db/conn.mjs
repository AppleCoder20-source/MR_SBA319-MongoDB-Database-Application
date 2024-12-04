import mongoose from 'mongoose';

const connectionString = process.env.ATLAS_URI || 'mongodb://localhost:3001';

async function connects() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

export default connects;
