const mongoose = require('mongoose');
const { Schema } = mongoose;

//Model responsavel pelos produtos
const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome e obrigatorio'],
    },
    description: {
      type: String,
      required: [true, 'Descricao e obrigatorio'],
    },
    price: {
      type: Number,
      required: [true, 'Preço e obrigatorio'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantidade e obrigatorio'],
      default: 0,
    },
    photo: {
      type: String,
      required: false,
    },
  },

  {
    collection: 'Products',
    timestamps: true,
  }
);

module.exports = mongoose.model('Products', productsSchema);