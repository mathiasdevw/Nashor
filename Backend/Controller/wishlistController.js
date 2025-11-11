import Wishlist from "../Model/wishlist.js";


/*
Olá, pfv corrigir certas coisas, nao sei ao certo se tem id no client ou product, o nome pode estar errado, se estiver 
faça a mudança, alguns erros podem ocorrer devidos a nomes errados, tentarei fazer o maximo para nao por nomes incorretos :)
*/
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ client: req.params.clientId })
      .populate("products", "name price photo");

    if (!wishlist)
      return res.status(404).json({ message: "Lista de Desejos Vazia" });

    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Erro ao buscar wishlist:", error);
    res.status(500).json({ message: "Erro ao buscar wishlist", error });
  }
};

export const addProductToWishlist = async(req,res) => {
    try {
        const { clientId, productId } = req.body;

        let w = await Wishlist.findOne({ client: clientId});

        if(!w){
            w = new Wishlist({client: clientId, products: [productId]});
        } else {
            if(!w.products.includes(productId)) {
                w.products.push(productId);
            }
        }

        const saved = await w.save();
        res.status(200).json(saved);
    } catch (error) {
        res.status(400).json({ message: "Erro ao adicionar o produto", error})
    }
}

export const removeProductFromWishlist = async (req, res) => {
    try {
        const { clientId, productId } = req.body;

        const w = await Wishlist.findOne({ client: clientId});
        if(!w)
            return res.status(404).json({ message: "Lista de Desejos não encontrada"});
        w.products = w.products.filter (
            (p) => p.toString() !== productId
        );

        const saved = await w.save();
        res.status(200).json(saved);
    } catch (error) {
        res.status(400).json({message: "Erro ao Remover Produto"})
    }

    
};

export const clearWishlist = async (req, res) => {
  try {
    const { clientId } = req.params;

    const wishlist = await Wishlist.findOneAndUpdate(
      { client: clientId },
      { products: [] },
      { new: true }
    );

    if (!wishlist)
      return res.status(404).json({ message: "Lista de Desejos não encontrada" });

    res.status(200).json({ message: "Lista de Desejos foi limpa com sucesso", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Erro ao limpar Lista de Desejos", error: error.message });
  }
};