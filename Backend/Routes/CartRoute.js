import express from 'express';
import CartController from '../Controller/CartController.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *         quantity:
 *           type: integer
 *         size:
 *           type: string
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CartInput:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *         - size
 *       properties:
 *         productId:
 *           type: string
 *         quantity:
 *           type: integer
 *         size:
 *           type: string
 */

router.use(authenticateToken);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Obtém o carrinho do usuário autenticado
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do carrinho e total
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *                 total:
 *                   type: number
 *       401:
 *         description: Token não fornecido
 *       404:
 *         description: Carrinho não encontrado
 */
router.get('/', CartController.getCart);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Adiciona um item ao carrinho
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartInput'
 *     responses:
 *       200:
 *         description: Item adicionado ao carrinho
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Erro ao adicionar item (estoque insuficiente, tamanho indisponível)
 *       401:
 *         description: Token não fornecido
 *       404:
 *         description: Produto não encontrado
 */
router.post('/add', CartController.addItemToCart);

/**
 * @swagger
 * /cart/remove:
 *   delete:
 *     summary: Remove um item do carrinho
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - size
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID do produto a remover
 *               size:
 *                 type: string
 *                 description: Tamanho do produto
 *     responses:
 *       200:
 *         description: Item removido do carrinho
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Erro ao remover item
 *       401:
 *         description: Token não fornecido
 *       404:
 *         description: Carrinho não encontrado
 */
router.delete('/remove', CartController.removeItemFromCart);

export default router;
