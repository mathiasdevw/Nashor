const ProductsModel = require('../Model/ProductsModel');
//Controller responsavel pelos produtos

class ProductsController {
  //Criar
  static async createProduct(req, res) {
    try {
      const newProduct = await ProductsModel.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //Buscar todos
  static async getAllProducts(req, res) {
    try {
      const products = await ProductsModel.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
    }
  }

  //Procurar por ID.
  static async getProductById(req, res) {
    try {
      const product = await ProductsModel.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error);
      res.status(500).json({ message: 'Erro interno ao buscar produto' });
    }
  } 


  //Atualizacao basica no produto
  static async updateProductInfo(req, res) {
    try {
      const { id } = req.params;
      const { sizes, ...updateData } = req.body; 

      const updatedProduct = await ProductsModel.findByIdAndUpdate(id, updateData, { new: true });
      
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Produto nao encontrado para atualizar' });
      }
    
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error.message);
      res.status(500).json({ message: 'Erro interno ao atualizar o produto' });
    }
  }
  //Atualiza o estoque
  static async updateStockBySize(req, res) {
    try {
      const { id } = req.params; 
      const { size, quantity } = req.body;

      if (size == null || quantity == null) {
        return res.status(400).json({ message: 'Tamanho e quantidade são obrigatórios.' });
      }
      const updatedProduct = await ProductsModel.findOneAndUpdate(
        { 
          _id: id,           
          'sizes.size': size  
        },
        { 
          $set: { 'sizes.$.quantity': quantity } 
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Produto ou tamanho não encontrado.' });
      }

      res.status(200).json(updatedProduct);

    } catch (error) {
      console.error('Erro ao atualizar estoque:', error.message);
      res.status(500).json({ message: 'Erro interno ao atualizar estoque' });
    }
  }
  
  //Deletar
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deleteProduct = await ProductsModel.findByIdAndDelete(id);
      
      if (!deleteProduct) {
        return res.status(404).json({ message: 'Produto nao encontrado para deletar' });
      }
      res.status(200).json({ message: 'Deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar o produto:', error.message);
      res.status(500).json({ message: 'Erro interno ao deletar produto' });
    }
  }
}

module.exports = ProductsController;