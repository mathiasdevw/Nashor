import express from "express";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import connectDB from "./Backend/Config/MongoConnect.js";
import userRoute from "./Backend/Routes/userRoute.js";
import clientRoute from "./Backend/Routes/clientRoute.js";
import CartRoute from "./Backend/Routes/CartRoute.js";
import ProductsRoute from "./Backend/Routes/ProductsRoute.js";
import PaymentRoute from "./Backend/Routes/PaymentRoute.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários com autenticação',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./Backend/Routes/*.js'], // Caminhos para as rotas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/', userRoute);
app.use('/api', clientRoute);
app.use('/cart', CartRoute);
app.use('/api/products', ProductsRoute);
app.use('/payment', PaymentRoute);

app.get("/", (req, res) => {
  res.send("Servidor funcionando! Acesse /api-docs para a documentação Swagger.");
});

app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000"));
