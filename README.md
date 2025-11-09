# Backend API - Sistema de Gestão

Este é um backend API desenvolvido em Node.js para um sistema de gestão, incluindo gerenciamento de usuários, produtos, carrinhos e clientes. Inclui autenticação JWT, recuperação de senha por email e documentação Swagger.

## Funcionalidades

- **Gerenciamento de Usuários**: CRUD completo com autenticação JWT
- **Login e Autenticação**: Endpoint de login que retorna token JWT
- **Recuperação de Senha**: Via email e CPF
- **Gerenciamento de Produtos**: CRUD de produtos
- **Gerenciamento de Carrinhos**: CRUD de carrinhos de compras
- **Gerenciamento de Clientes**: CRUD de clientes
- **Documentação Swagger**: API docs interativa em `/api-docs`
- **Middleware de Autenticação**: Proteção de rotas privadas
- **Validação de Dados**: Usando Mongoose schemas
- **Logs de Erro**: Tratamento de erros estruturado

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT (jsonwebtoken)**: Autenticação baseada em tokens
- **bcryptjs**: Hashing de senhas
- **nodemailer**: Envio de emails
- **swagger-ui-express & swagger-jsdoc**: Documentação da API
- **dotenv**: Gerenciamento de variáveis de ambiente

## Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-projeto>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente (veja seção abaixo).

4. Inicie o servidor:
   ```bash
   npm run dev  # Para desenvolvimento (com nodemon)
   # ou
   npm start    # Para produção
   ```

O servidor estará rodando em `http://localhost:3000`.

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
MONGO_URI=mongodb://localhost:27017/nome-do-banco  # ou sua URI do MongoDB Atlas
JWT_SECRET=sua-chave-secreta-para-jwt
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app-do-gmail  # Use senha de app, não a senha normal
```

**Nota**: Para o Gmail, ative a autenticação de 2 fatores e gere uma senha de app em [Google Account Settings](https://myaccount.google.com/apppasswords).

## Estrutura do Projeto

```
Backend/
├── Config/
│   └── MongoConnect.js          # Conexão com MongoDB
├── Controller/
│   ├── userController.js        # Lógica de usuários
│   ├── ProductsController.js    # Lógica de produtos
│   ├── CartController.js        # Lógica de carrinhos
│   └── clientController.js      # Lógica de clientes
├── Middleware/
│   ├── authMiddleware.js        # Middleware de autenticação JWT
│   └── managerMiddleware.js     # Middleware adicional (se usado)
├── Model/
│   ├── User.js                  # Schema de usuário
│   ├── ProductsModel.js         # Schema de produtos
│   ├── CartModel.js             # Schema de carrinhos
│   └── client.js                # Schema de clientes
├── Routes/
│   ├── userRoute.js             # Rotas de usuários
│   ├── clientRoute.js           # Rotas de clientes
│   └── (outras rotas)           # Adicione conforme necessário
├── Service/
│   └── emailService.js          # Serviço de envio de emails
└── (arquivos principais)
server.js                        # Arquivo principal do servidor
package.json                     # Dependências e scripts
.env                             # Variáveis de ambiente (não commitar)
```

## API Endpoints

### Usuários
- `GET /api/users` - Listar todos os usuários (autenticado)
- `GET /api/users/:id` - Obter usuário por ID (autenticado)
- `POST /api/users` - Criar novo usuário
- `PUT /api/users/:id` - Atualizar usuário (autenticado)
- `DELETE /api/users/:id` - Deletar usuário (autenticado)
- `POST /api/login` - Login (retorna token JWT)
- `POST /api/recover-password` - Recuperar senha via email e CPF

### Produtos
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

### Carrinhos
- `GET /api/carts` - Listar carrinhos
- `POST /api/carts` - Criar carrinho
- `PUT /api/carts/:id` - Atualizar carrinho
- `DELETE /api/carts/:id` - Deletar carrinho

### Clientes
- `GET /api/clients` - Listar clientes
- `POST /api/clients` - Criar cliente
- `PUT /api/clients/:id` - Atualizar cliente
- `DELETE /api/clients/:id` - Deletar cliente

### Documentação
- `GET /api-docs` - Documentação Swagger interativa

**Nota**: Para endpoints autenticados, inclua o header `Authorization: Bearer <token>`.

## Exemplos de Uso

### Criar Usuário
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "cpf": "12345678901",
    "birthDate": "1990-01-01",
    "email": "joao@example.com",
    "password": "senha123",
    "address": {
      "street": "Rua A",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01234567",
      "country": "Brasil"
    },
    "phone": "11999999999"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "joao@example.com", "password": "senha123"}'
```

Resposta: `{"token": "jwt-token-aqui", "user": {...}}`

### Usar Token em Requisição Autenticada
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer jwt-token-aqui"
```

### Recuperar Senha
```bash
curl -X POST http://localhost:3000/api/recover-password \
  -H "Content-Type: application/json" \
  -d '{"email": "joao@example.com", "cpf": "12345678901"}'
```

## Testes

Para testar a API:

1. Inicie o servidor: `npm run dev`
2. Acesse `http://localhost:3000/api-docs` para documentação interativa
3. Use ferramentas como Postman, Insomnia ou curl para testar endpoints
4. Verifique logs no terminal para erros

## Desenvolvimento

- Use `npm run dev` para desenvolvimento com auto-reload
- Adicione novos endpoints seguindo o padrão MVC
- Atualize a documentação Swagger conforme necessário
- Teste sempre as mudanças

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.
