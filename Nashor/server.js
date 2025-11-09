import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro:", err));


app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});


app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000"));
