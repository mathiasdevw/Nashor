export async function sendAccessEmail(to, email, senha) {
    // Simulação de envio de email - apenas log para fins acadêmicos
    console.log(`📧 Simulação de envio de email para: ${to}`);
    console.log(`💳 Pagamento aprovado - Email: ${email}, Senha: ${senha}`);
    console.log(`ℹ️  Em produção, implemente envio real de email aqui`);

    // Retorna sucesso sempre para não quebrar o fluxo
    return { success: true, message: 'Email simulado enviado com sucesso' };
}

export async function sendPasswordRecoveryEmail(to, newPassword) {
    // Simulação de envio de email - apenas log para fins acadêmicos
    console.log(`📧 Simulação de envio de email para: ${to}`);
    console.log(`🔑 Nova senha gerada: ${newPassword}`);
    console.log(`ℹ️  Em produção, implemente envio real de email aqui`);

    // Retorna sucesso sempre para não quebrar o fluxo
    return { success: true, message: 'Email simulado enviado com sucesso' };
}
