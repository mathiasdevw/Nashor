import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado: ${conect.connection.host}`);
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
