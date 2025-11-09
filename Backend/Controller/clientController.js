import Client from "../Model/client";
import client from "../Model/client"

export const getClients = async (req, res) => {
    try{
        const c = await client.find();
        res.json(c);
    } catch (error) {
        res.status(500).json({message: "Erro ao procurar clientes",error})

    }
};

export const getClientPorId = async (req , res) => {
    try {
    const c = await client.findById(req.params.id);
    if(!c) return res.status(404).json({message: "Cliente não foi encontradp", error})
    res.json(c)
    }
    catch (error){
    res.status(500).json ({ message:" Erro ao buscar cliente", error})
}
}

export const createClient = async (req, res) => {
    try{
        const newC = new client(req.body);
        const savedC = await newC.save();
        res.status(201).json(savedC);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar cliente", error})
    }
};

export const updateClient = async (req, res) =>{
    try{
        const updateC = await client.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!updateC) return res.status(404).json({message: "Cliente não econtrado para atualizar"});
        res.json(updateC);
    } catch(error) {
        res.status(400).json({message: "Erro ao atualizar cliente"});
        }
};

export const deleteClient = async (req, res) =>{
    try{
        const deleteC = await client.findByIdAndDelete(req.params.id);
        if(!deleteC) return res.status(404).json({ message: "Cliente não encontrado"});
        res.json({message: "Cliente removido!"})
    } catch (error) {
        res.status(400).json({message: "Erro ao remover", error})
    }
};

