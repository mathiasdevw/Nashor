import mongoose from 'mongoose';
const { Schema } = mongoose;

//Model responsavel pelo carrinho de compras
const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Products',
          required: true,
        },

        size: {
          type: String,
          required: [true, 'O tamanho é obrigatório'],
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantidade tem que ser maior que 1'],
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;
