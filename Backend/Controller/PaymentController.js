import Stripe from 'stripe';
import Cart from '../Model/CartModel.js';
import Order from '../Model/OrderModel.js';
import Product from '../Model/ProductsModel.js';

// Importe seu serviço de e-mail
import { sendAccessEmail } from '../Service/EmailService.js'; 


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Striper

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user.id; 

    
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'items.product',
      select: 'name price', 
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Seu carrinho está vazio' });
    }

    const line_items = cart.items.map((item) => {
      const product = item.product;
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            description: `Tamanho: ${item.size}`, 
          },
          unit_amount: Math.round(product.price * 100), 
        },
        quantity: item.quantity,
      };
    });

    // 3. Cria a sessão na Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'],
      mode: 'payment',
      line_items: line_items,
      metadata: {
        userId: userId.toString(),
        cartId: cart._id.toString(),
      },
      
      // Pega o e-mail do usuário logado (assumindo que seu middleware o fornece)
      customer_email: req.user.email,

      success_url: `${process.env.REDIRECT_URL}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL,
    });

    return res.json({ checkoutUrl: session.url });

  } catch (err) {
    console.error('ERRO AO CRIAR SESSÃO STRIPE:', err);
    return res.status(500).json({ error: 'Erro ao gerar link de pagamento' });
  }
};


//Webhook

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Erro na verificaçao do Webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId, cartId } = session.metadata;

    try {
      const existingOrder = await Order.findOne({ stripePaymentIntentId: session.payment_intent });
      if (existingOrder) {
        console.log('Pedido ja processado:', session.payment_intent);
        return res.status(200).json({ received: true, message: 'Pedido ja processado' });
      }

      //Pega o carrinho
      const cart = await Cart.findById(cartId).populate('items.product');
      if (!cart) throw new Error('Carrinho não encontrado no webhook');
      const orderItems = cart.items.map((item) => ({
        product: item.product.toObject(), 
        size: item.size,
        quantity: item.quantity,
        priceAtPurchase: item.product.price, 
      }));


      // Cria o pedido no banco
      const newOrder = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount: session.amount_total / 100,
        paymentStatus: 'paid',
        stripePaymentIntentId: session.payment_intent,
        shippingAddress: session.customer_details.address,
      });
      console.log(`Pedido [${newOrder._id}] salvo para usuario ${userId}`);

      // Atualiza o estoque
      for (const item of cart.items) {
        await Product.findOneAndUpdate(
          { _id: item.product._id, 'sizes.size': item.size },
          { $inc: { 'sizes.$.quantity': -item.quantity } } 
        );
      }
      console.log(`Estoque atualizado para pedido ${newOrder._id}`);
      
      // Carrinho reseta
      await Cart.findByIdAndUpdate(cartId, { $set: { items: [] } });
      console.log(`Carrinho [${cartId}] limpo.`);

      // Envia o email de confirmaçao da compra
      const customerEmail = session.customer_details.email;
      if (customerEmail) {
        await sendAccessEmail(customerEmail, newOrder);
        console.log(`E-mail de confirmação enviado para ${customerEmail}.`);
      }

    } catch (err) {
      console.error('Falha na logica pos-pagamento:', err);
      return res.status(500).json({ error: 'Falha ao processar pedido.' });
    }
  }

  res.status(200).json({ received: true });
};