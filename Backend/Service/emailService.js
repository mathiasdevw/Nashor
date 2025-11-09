import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendAccessEmail(to, email, senha) {
    const mailOptions = {
        from: `"Compra Realizada com sucesso!" <${process.env.EMAIL_USER}>`,
        to,
        subject: "PAGAMENTO REALIZADO",
        html: `
      <h2>Ola! !</h2>
      <p>Seu pagamento foi aprovado. Apenas aguardar o seu pedido chegar.</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Senha:</b> ${senha}</p>
       <p>Equipe Nashor</p>
    `,
    };

    try {
        console.log(`Tentando enviar e-mail para: ${to}`);
        const info = await transporter.sendMail(mailOptions);
        console.log("E-mail enviado com sucesso:", info.messageId);
    } catch (error) {
        console.error(`Erro ao enviar e-mail para ${to}:`, error);
        throw new Error('Falha no serviço de envio de e-mail');
    }
}

export async function sendPasswordRecoveryEmail(to, newPassword) {
    const mailOptions = {
        from: `"Recuperação de Senha" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Sua nova senha foi gerada",
        html: `
      <h2>Recuperação de Senha</h2>
      <p>Sua senha foi redefinida com sucesso.</p>
      <p><b>Nova Senha:</b> ${newPassword}</p>
      <p>Recomendamos que você altere esta senha após o login.</p>
      <p>Equipe Nashor</p>
    `,
    };

    try {
        console.log(`Tentando enviar e-mail de recuperação para: ${to}`);
        const info = await transporter.sendMail(mailOptions);
        console.log("E-mail de recuperação enviado com sucesso:", info.messageId);
    } catch (error) {
        console.error(`Erro ao enviar e-mail de recuperação para ${to}:`, error);
        throw new Error('Falha no serviço de envio de e-mail');
    }
}
