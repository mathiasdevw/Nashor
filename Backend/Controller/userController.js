import User from "../Model/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const getUsers = async (req,res) => {
    try {
        const u = await User.find();
        res.json(u);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
}

export const getUserPorId = async (req,res) =>{
    try {
        const u = await User.findById(req.params.id);
        if(!u) return res.status(404).json({ message: "Usuário não encontrado" });
        res.json(u);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};

export const createUser = async (req, res) =>{
    try {
        const { password } = req.body;
        const hashed = await bcrypt.hash(password, 6);

        const newU = new User({ ...req.body, password: hashed, role: 'user' });
        const savedUser = await newU.save();
        res.status(201).json(savedUser);
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

export const registerUser = async (req, res) => {
    try {
        const { password } = req.body;
        const hashed = await bcrypt.hash(password, 6);

        const newU = new User({ ...req.body, password: hashed, role: 'user' });
        const savedUser = await newU.save();
        res.status(201).json(savedUser);
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

export const updateUser = async (req, res) =>{
    try{
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 6);
        }
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: "Usuário não foi encontrado" });
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

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: "Login realizado com sucesso",
      token,
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error: error.message });
  }
};

export const recoverPassword = async (req, res) => {
  try {
    const { email, cpf } = req.body;

    if (!email || !cpf) {
      return res.status(400).json({ message: "Email e CPF são obrigatórios" });
    }

    const user = await User.findOne({ email: email.toLowerCase(), cpf });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado com essas credenciais" });
    }

    // Gerar nova senha aleatória
    const newPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(newPassword, 6);

    // Atualizar senha no banco
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });

    // Simula envio de email (apenas log)
    console.log(`📧 Nova senha para ${user.email}: ${newPassword}`);

    res.json({ message: "Nova senha gerada com sucesso. Verifique seu e-mail (se configurado)." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao recuperar senha", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor", error: error.message });
  }
};
