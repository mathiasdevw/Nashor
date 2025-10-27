import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<nomeDoBanco>?retryWrites=true&w=majority"
    );
    console.log("✅ Conectado ao MongoDB Atlas!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
  }
};

export default connectDB;
