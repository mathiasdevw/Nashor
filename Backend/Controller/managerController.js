import Manager from "../Model/Manager.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const getManagers = async (req,res) => {
    try {
        const m = await Manager.find();
        res.json(m);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
}

export const getManagerPorId = async (req,res) =>{
    try {
        const m = await Manager.findById(req.params.id);
        if(!m) return res.status(404).json({ message: "Manager não encontrado" });
        res.json(m);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};

export const createManager = async (req, res) =>{
    try {
        const { password } = req.body;
        const hashed = await bcrypt.hash(password, 6);

        const newM = new Manager({ ...req.body, password: hashed, role: 'manager' });
        const savedManager = await newM.save();
        res.status(201).json(savedManager);
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

export const registerManager = async (req, res) => {
    try {
        const { password } = req.body;
        const hashed = await bcrypt.hash(password, 6);

        const newM = new Manager({ ...req.body, password: hashed, role: 'manager' });
        const savedManager = await newM.save();
        res.status(201).json(savedManager);
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

export const updateManager = async (req, res) =>{
    try{
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 6);
        }
        const updated = await Manager.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: "Manager não foi encontrado" });
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

export const deleteManager = async (req, res) => {
  try {
    const deleted = await Manager.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Manager não encontrado" });
    res.json({ message: "Manager removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor", error: error.message });
  }
};

export const loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const manager = await Manager.findOne({ email: email.toLowerCase() });
    if (!manager) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const isMatch = await manager.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: manager._id, email: manager.email, role: manager.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: "Login realizado com sucesso",
      token,
      manager: manager.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error: error.message });
  }
};

export const recoverPasswordManager = async (req, res) => {
  try {
    const { email, cpf } = req.body;

    if (!email || !cpf) {
      return res.status(400).json({ message: "Email e CPF são obrigatórios" });
    }

    const manager = await Manager.findOne({ email: email.toLowerCase(), cpf });
    if (!manager) {
      return res.status(404).json({ message: "Manager não encontrado com essas credenciais" });
    }

    // Gerar nova senha aleatória
    const newPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(newPassword, 6);

    // Atualizar senha no banco
    await Manager.findByIdAndUpdate(manager._id, { password: hashedPassword });

    // Simula envio de email (apenas log)
    console.log(`📧 Nova senha para ${manager.email}: ${newPassword}`);

    res.json({ message: "Nova senha gerada com sucesso. Verifique seu e-mail (se configurado)." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao recuperar senha", error: error.message });
  }
};

export const getManagerProfile = async (req, res) => {
  try {
    const manager = await Manager.findById(req.manager.id);
    if (!manager) {
      return res.status(404).json({ message: "Manager não encontrado" });
    }
    res.json(manager);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor", error: error.message });
  }
};
