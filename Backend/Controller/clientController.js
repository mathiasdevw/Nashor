import Client from "../Model/client.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const getClients = async (req,res) => {
    try {
        const c = await Client.find();
        res.json(c);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
}

export const getClientPorId = async (req,res) =>{
    try {
        const c = await Client.findById(req.params.id);
        if(!c) return res.status(404).json({ message: "Cliente não encontrado" });
        res.json(c);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};

export const createClient = async (req, res) =>{
    try {
        const { password } = req.body;
        const hashed = await bcrypt.hash(password, 6);

        const newC = new Client({ ...req.body, password: hashed, role: 'client' });
        const savedClient = await newC.save();
        res.status(201).json(savedClient);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Erro de validação", errors });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email ou CPF já cadastrado" });
        }
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};

export const registerClient = async (req, res) => {
    try {
        const { password } = req.body;
        const hashed = await bcrypt.hash(password, 6);

        const newC = new Client({ ...req.body, password: hashed, role: 'client' });
        const savedClient = await newC.save();
        res.status(201).json(savedClient);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Erro de validação", errors });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email ou CPF já cadastrado" });
        }
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};

export const updateClient = async (req, res) =>{
    try{
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 6);
        }
        const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: "Cliente não foi encontrado" });
        res.json(updated);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Erro de validação", errors });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email ou CPF já cadastrado" });
        }
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};

export const deleteClient = async (req, res) => {
  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Cliente não encontrado" });
    res.json({ message: "Cliente removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor", error: error.message });
  }
};

export const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const client = await Client.findOne({ email: email.toLowerCase() });
    if (!client) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const isMatch = await client.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: client._id, email: client.email, role: client.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: "Login realizado com sucesso",
      token,
      client: client.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error: error.message });
  }
};

export const recoverPasswordClient = async (req, res) => {
  try {
    const { email, cpf } = req.body;

    if (!email || !cpf) {
      return res.status(400).json({ message: "Email e CPF são obrigatórios" });
    }

    const client = await Client.findOne({ email: email.toLowerCase(), cpf });
    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado com essas credenciais" });
    }

    // Gerar nova senha aleatória
    const newPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(newPassword, 6);

    // Atualizar senha no banco
    await Client.findByIdAndUpdate(client._id, { password: hashedPassword });

    // Simula envio de email (apenas log)
    console.log(`📧 Nova senha para ${client.email}: ${newPassword}`);

    res.json({ message: "Nova senha gerada com sucesso. Verifique seu e-mail (se configurado)." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao recuperar senha", error: error.message });
  }
};

export const getClientProfile = async (req, res) => {
  try {
    const client = await Client.findById(req.user.id);
    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor", error: error.message });
  }
};

