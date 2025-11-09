import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendAccessEmail(toEmail, order) {
  const itemsHtml = order.items
    .map(
      (item) => `
    <li>
      <b>${item.product.name}</b> (Tamanho: ${item.size})<br>
      Quantidade: ${item.quantity} x R$ ${item.priceAtPurchase.toFixed(2)}
    </li>
  `
    )
    .join(''); 

  const mailOptions = {
    from: `"Equipe Nashor" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Obrigado pela sua compra! (Pedido #${order._id.toString().slice(-6)})`, 
    html: `
      <h2>Obrigado pela sua compra!</h2>
      <p>Olá! Recebemos a confirmação do seu pagamento e seu pedido já está sendo preparado.</p>
      
      <h3>Resumo do Pedido</h3>
      <ul>
        ${itemsHtml}
      </ul>
      
      <hr>
      <h3>Valor Total: R$ ${order.totalAmount.toFixed(2)}</h3>
      
      <p>Qualquer dúvida, basta responder a este e-mail.</p>
      <p>Equipe Nashor</p>
    `,
  };

  try {
    console.log(`Tentando enviar e-mail de confirmação para: ${toEmail}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso:', info.messageId);
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${toEmail}:`, error);

  }
}