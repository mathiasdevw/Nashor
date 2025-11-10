# TODO: Transformação do Sistema - Unificar em Client e Manager

## Status: Concluído

### 1. Atualizar Model/client.js
- [x] Adicionar campos completos: cpf, birthDate, password, address (schema), phone, role (enum: ['client'], default: 'client')
- [x] Adicionar validações (cpf 11 dígitos, email único, etc.)
- [x] Adicionar métodos: toJSON (remover password), comparePassword
- [x] Importar bcrypt e validator

### 2. Criar Model/Manager.js
- [x] Criar novo arquivo com campos idênticos a Client.js, mas role enum: ['manager'], default: 'manager'

### 3. Refazer Controller/clientController.js
- [x] Importar Client em vez de Client antigo
- [x] Adicionar funções: getClients, getClientPorId, createClient (com hash), registerClient, updateClient, deleteClient, loginClient, recoverPasswordClient, getClientProfile
- [x] Baseado em userController.js, mas ajustado para Client

### 4. Criar Controller/managerController.js
- [x] Novo arquivo baseado em userController.js, mas usando Manager model
- [x] Funções similares: getManagers, createManager, loginManager, etc.

### 5. Atualizar Routes/clientRoute.js
- [x] Baseado em userRoute.js, ajustado para Client
- [x] Atualizar swagger schemas para novos campos
- [x] Rotas: /api/clients, /api/login-client, /api/register-client, etc.

### 6. Criar Routes/managerRoute.js
- [x] Novo arquivo baseado em userRoute.js, para Manager
- [x] Swagger para Manager

### 7. Atualizar server.js
- [x] Remover import de userRoute
- [x] Adicionar import de managerRoute
- [x] Usar managerRoute em app.use

### 8. Atualizar Middlewares
- [x] authMiddleware.js: Ajustar para verificar role 'client' se necessário (ou manter genérico)
- [x] managerMiddleware.js: Ajustar para usar Manager model para verificar role 'manager'

### 9. Ajustar Dependências em Outros Modelos
- [x] OrderModel.js: Mudar ref 'User' para 'Client'
- [x] CartModel.js: Mudar ref 'User' para 'Client'

### 10. Remover Arquivos Antigos
- [x] Deletar Backend/Model/User.js
- [x] Deletar Backend/Controller/userController.js
- [x] Deletar Backend/Routes/userRoute.js

### 11. Verificar e Testar
- [ ] Verificar se dados no MongoDB (coleção User) precisam migração para Client/Manager
- [ ] Testar endpoints de Client e Manager
- [ ] Atualizar swagger se necessário
- [ ] Verificar se tudo funciona (login, CRUD, etc.)

### Notas
- Após mudanças, testar login/registro para Client e Manager.
- Se houver dados antigos, migrar manualmente ou script.
- Atualizar este TODO à medida que avança.
