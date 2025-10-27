import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// cria a aplicação express
const app = express();
app.use(express.json());

// conecta ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro:", err));

// rota simples pra testar
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// inicia o servidor
app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000"));
