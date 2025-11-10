export const sendAccessEmail = async (email, order) => {
  // Simulação de envio de e-mail
  console.log(`📧 E-mail de confirmação enviado para ${email}`);
  console.log(`Detalhes do pedido: ${JSON.stringify(order, null, 2)}`);
  // Aqui você pode integrar com um serviço real como Nodemailer, SendGrid, etc.
};
