# TODO: Teste das Rotas do Projeto

## Status: Em Andamento

### 1. Iniciar Servidor
- [ ] Verificar se MongoDB está rodando
- [ ] Iniciar servidor com `npm run dev`
- [ ] Verificar se servidor está rodando na porta 3000

### 2. Testar Rotas de Cliente (Client)
- [ ] Registrar um cliente PF via POST /api/register-client
- [ ] Fazer login do cliente via POST /api/login-client
- [ ] Obter perfil do cliente via GET /api/clients/me (usando token)
- [ ] Deletar o cliente via DELETE /api/clients/:id (usando token de manager)

### 3. Testar Rotas de Manager
- [ ] Registrar um manager via POST /api/register-manager
- [ ] Fazer login do manager via POST /api/login-manager
- [ ] Criar outro manager via POST /api/managers (usando token de manager)
- [ ] Listar managers via GET /api/managers (usando token de manager)
- [ ] Deletar o manager criado via DELETE /api/managers/:id (usando token de manager)

### 4. Testar Outras Rotas
- [ ] Verificar rotas de produtos, carrinho, pagamento se necessário
- [ ] Testar recuperação de senha se quiser

### 5. Limpeza
- [ ] Parar servidor
- [ ] Verificar logs e possíveis erros

### Notas
- Usar curl para testar endpoints
- Salvar tokens de login para usar em rotas protegidas
- Documentar respostas e códigos de status
