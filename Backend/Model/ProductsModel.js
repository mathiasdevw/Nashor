import mongoose from 'mongoose';
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
    sizes: [
      {
        size: {
          type: String,
          required: true,
        },
        quantity: { // Estoque para o tamanho específico
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],

    photo: {
      type: String,
      required: false,
    },
  },

  {
    collection: 'products',
    timestamps: true,
  }
);

const Product = mongoose.model('Products', ProductsSchema);
export default Product;
