import Cart from '../Model/CartModel.js';
import Product from '../Model/ProductsModel.js';

//Controller do carrinho de compras

class CartController {
 
    //Adicionar Item ao carrinho
  static async addItemToCart(req, res) {
    const { productId, size, quantity } = req.body;
    const userId = req.user.id; // <-- VEM DA AUTENTICAÇÃO

    try {
    //procura o produto
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      // Encontra o tamanho específico no estoque do produto
      const sizeInfo = product.sizes.find((s) => s.size === size);
      if (!sizeInfo) {
        return res.status(400).json({ message: 'Tamanho não disponível para este produto' });
      }
      if (sizeInfo.quantity < quantity) {
        return res.status(400).json({ message: 'Quantidade em estoque insuficiente' });
      }

      //verifica se o usuario ja tem o carrinho vrum vrum
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }

      // verifica se o cliente ja nao adicionou no carrinho e se tiver ele so atualiza quantidade
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId && item.size === size
      );
      if (itemIndex > -1) {
        let newQuantity = cart.items[itemIndex].quantity + quantity;
        if (sizeInfo.quantity < newQuantity) {
            return res.status(400).json({ message: 'Quantidade total excede o estoque' });
        }
        cart.items[itemIndex].quantity = newQuantity;

      } else {
        cart.items.push({ product: productId, size, quantity });
      }

      //salva o carrinho :D
      await cart.save();
      res.status(200).json(cart);

    } catch (error) {
      res.status(500).json({ message: 'Erro ao adicionar item ao carrinho', error: error.message });
    }
  }

  //busca o carrinho do usuario com o total
  static async getCart(req, res) {
    const userId = req.user.id; // autenticacao fica aqui

    try {
      const cart = await Cart.findOne({ user: userId })
        .populate({
          path: 'items.product',
          select: 'name price photo', 
        });

      if (!cart) {
        return res.status(404).json({ message: 'Carrinho não encontrado' });
      }

      //calculo do carrinho
      let total = 0;
      cart.items.forEach((item) => {
        total += item.product.price * item.quantity;
      });

      res.status(200).json({ cart, total });

    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar carrinho', error: error.message });
    }
  }

  //remove do carrinho
  static async removeItemFromCart(req, res) {
    const { productId, size } = req.body;
    const userId = req.user.id; //autenticacao aqui

    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { user: userId },
        {
          $pull: {
            items: { product: productId, size: size },
          },
        },
        { new: true } 
      );

      if (!updatedCart) {
        return res.status(404).json({ message: 'Carrinho não encontrado' });
      }

      res.status(200).json(updatedCart);

    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover item', error: error.message });
    }
  }
}

export default CartController;
