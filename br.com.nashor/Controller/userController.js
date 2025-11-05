import user from "../Model/User"
import bcrypt from "bcryptjs"

export const getUsers = async (req,res) => {
    try {
        const u = await user.find();
        res.json(u);
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar o usuario", error });
    }
}

export const getUserPorId = async (req,res) =>{
    try {
        const u = await user.findById(req.params.id);
        if(!u) return res.status(400).json({ message: "O Usuário não foi encontrado"})
        res.json(u);
    } catch (error) {
        res.status(500).json({ message:"Erro ao procurar usuário", error})
    }
};

export const createUser = async (req, res) =>{
    try {
        const { password } = req.body;
        const hashed = await bcrypt.has(password, 6);
        const newU = await user({ ...req.body, password: hashed})
        const s = await newU.save();
        res.status(201).json(s); 
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar o usuário", error})
    }
};

export const updateUser = async (req, res) =>{
    try{
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 6);
        }
       const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Usuário não foi encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar usuário", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    res.status(400).json({ message: "Erro ao excluir usuário", error });
  }
};