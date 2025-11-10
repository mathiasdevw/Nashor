import express from "express"
import {
    getManagers,
    getManagerPorId,
    createManager,
    updateManager,
    deleteManager,
    loginManager,
    registerManager,
    recoverPasswordManager,
    getManagerProfile,
} from "../Controller/managerController.js"
import { authenticateToken } from "../Middleware/authMiddleware.js"
import { authenticateManager } from "../Middleware/managerMiddleware.js"


const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Manager:
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
 *     ManagerInput:
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
 * /api/login-manager:
 *   post:
 *     summary: Login de manager
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
 *                 description: Email do manager
 *               password:
 *                 type: string
 *                 description: Senha do manager
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
 *                 manager:
 *                   $ref: '#/components/schemas/Manager'
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/api/login-manager", loginManager)

/**
 * @swagger
 * /api/managers:
 *   get:
 *     summary: Lista todos os managers
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de managers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Manager'
 */
router.get("/api/managers", authenticateManager, getManagers)

/**
 * @swagger
 * /api/managers/{id}:
 *   get:
 *     summary: Obtém um manager por ID
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do manager
 *     responses:
 *       200:
 *         description: Dados do manager
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       404:
 *         description: Manager não encontrado
 */
router.get("/api/managers/:id", authenticateManager, getManagerPorId)

/**
 * @swagger
 * /api/managers:
 *   post:
 *     summary: Cria um novo manager (apenas managers)
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ManagerInput'
 *     responses:
 *       201:
 *         description: Manager criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       400:
 *         description: Erro na criação do manager
 *       403:
 *         description: Acesso negado. Apenas managers podem criar managers
 */
/**
 * @swagger
 * /api/register-manager:
 *   post:
 *     summary: Registra um novo manager
 *     tags: [Managers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ManagerInput'
 *     responses:
 *       201:
 *         description: Manager registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       400:
 *         description: Erro no registro do manager
 */
/**
 * @swagger
 * /api/recover-password-manager:
 *   post:
 *     summary: Recupera senha do manager
 *     tags: [Managers]
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
 *                 description: Email do manager
 *               cpf:
 *                 type: string
 *                 description: CPF do manager
 *     responses:
 *       200:
 *         description: Nova senha enviada por e-mail
 *       400:
 *         description: Dados obrigatórios não fornecidos
 *       404:
 *         description: Manager não encontrado
 */
router.post("/api/managers", authenticateManager, createManager)
router.post("/api/register-manager", registerManager)
router.post("/api/recover-password-manager", recoverPasswordManager)

/**
 * @swagger
 * /api/managers/{id}:
 *   put:
 *     summary: Atualiza um manager
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do manager
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ManagerInput'
 *     responses:
 *       200:
 *         description: Manager atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       404:
 *         description: Manager não encontrado
 */
router.put("/api/managers/:id", authenticateManager, updateManager)

/**
 * @swagger
 * /api/managers/{id}:
 *   delete:
 *     summary: Deleta um manager
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do manager
 *     responses:
 *       200:
 *         description: Manager deletado com sucesso
 *       404:
 *         description: Manager não encontrado
 */
router.delete("/api/managers/:id", authenticateManager, deleteManager)

/**
 * @swagger
 * /api/managers/me:
 *   get:
 *     summary: Obtém o perfil do manager autenticado
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do perfil do manager
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       401:
 *         description: Token não fornecido
 *       404:
 *         description: Manager não encontrado
 */
router.get("/api/managers/me", authenticateToken, getManagerProfile)

export default router;
