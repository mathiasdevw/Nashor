import express from "express"
import {
    getClients,
    getClientPorId,
    createClient,
    updateClient,
    deleteClient,
    loginClient,
    registerClient,
    recoverPasswordClient,
    getClientProfile,
} from "../Controller/clientController.js"
import { authenticateToken } from "../Middleware/authMiddleware.js"
import { authenticateManager } from "../Middleware/managerMiddleware.js"


const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         cpf:
 *           type: string
 *         birthDate:
 *           type: string
 *           format: date
 *         email:
 *           type: string
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             zipCode:
 *               type: string
 *             country:
 *               type: string
 *         phone:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ClientInput:
 *       type: object
 *       required:
 *         - name
 *         - cpf
 *         - birthDate
 *         - email
 *         - password
 *         - address
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *         cpf:
 *           type: string
 *         birthDate:
 *           type: string
 *           format: date
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             zipCode:
 *               type: string
 *             country:
 *               type: string
 *         phone:
 *           type: string
 *
 * /api/login-client:
 *   post:
 *     summary: Login de cliente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do cliente
 *               password:
 *                 type: string
 *                 description: Senha do cliente
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 client:
 *                   $ref: '#/components/schemas/Client'
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login-client", loginClient)

/**
 * @swagger
 * /api/login-client:
 *   post:
 *     summary: Login de cliente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do cliente
 *               password:
 *                 type: string
 *                 description: Senha do cliente
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 client:
 *                   $ref: '#/components/schemas/Client'
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
router.get("/clients", authenticateManager, getClients)

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Obtém um cliente por ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Dados do cliente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente não encontrado
 */
router.get("/clients/me", authenticateToken, getClientProfile)

router.get("/clients/:id([0-9a-fA-F]{24})", authenticateManager, getClientPorId)

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Cria um novo cliente (apenas managers)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Erro na criação do cliente
 *       403:
 *         description: Acesso negado. Apenas managers podem criar clientes
 */
/**
 * @swagger
 * /api/register-client:
 *   post:
 *     summary: Registra um novo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *     responses:
 *       201:
 *         description: Cliente registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Erro no registro do cliente
 */
/**
 * @swagger
 * /api/recover-password-client:
 *   post:
 *     summary: Recupera senha do cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - cpf
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do cliente
 *               cpf:
 *                 type: string
 *                 description: CPF do cliente
 *     responses:
 *       200:
 *         description: Nova senha enviada por e-mail
 *       400:
 *         description: Dados obrigatórios não fornecidos
 *       404:
 *         description: Cliente não encontrado
 */
router.post("/clients", authenticateManager, createClient)
router.post("/register-client", registerClient)
router.post("/recover-password-client", recoverPasswordClient)

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Atualiza um cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente não encontrado
 */
router.put("/clients/:id([0-9a-fA-F]{24})", authenticateManager, updateClient)

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Deleta um cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.delete("/clients/:id([0-9a-fA-F]{24})", authenticateManager, deleteClient)



/**
 * @swagger
 * /api/create-user-pf:
 *   post:
 *     summary: Cria um usuário PF (Pessoa Física)
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *     responses:
 *       201:
 *         description: Usuário PF criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Erro na criação do usuário PF
 */
router.post("/create-user-pf", registerClient)

export default router;
