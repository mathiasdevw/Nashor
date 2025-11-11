import express from "express";
import {
  getWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
  clearWishlist,
} from "../Controller/wishlistController.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistProduct:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do produto
 *         name:
 *           type: string
 *           example: Camiseta Nashor Preta
 *         price:
 *           type: number
 *           example: 99.9
 *         photo:
 *           type: string
 *           example: https://meusite.com/imagens/camiseta-nashor-preta.png
 *     Wishlist:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID da wishlist
 *         client:
 *           type: string
 *           description: ID do cliente dono da wishlist
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WishlistProduct'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     AddWishlistInput:
 *       type: object
 *       required:
 *         - clientId
 *         - productId
 *       properties:
 *         clientId:
 *           type: string
 *           example: 67294e1894b319b92b04c9a1
 *         productId:
 *           type: string
 *           example: 67301a23ffae2e22b02a6e91
 *     RemoveWishlistInput:
 *       type: object
 *       required:
 *         - clientId
 *         - productId
 *       properties:
 *         clientId:
 *           type: string
 *           example: 67294e1894b319b92b04c9a1
 *         productId:
 *           type: string
 *           example: 67301a23ffae2e22b02a6e91
 */

router.use(authenticateToken);

/**
 * @swagger
 * /wishlist/{clientId}:
 *   get:
 *     summary: Busca a wishlist do cliente autenticado
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: clientId
 *         in: path
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wishlist encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       404:
 *         description: Wishlist não encontrada
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get("/:clientId", getWishlist);

/**
 * @swagger
 * /wishlist/add:
 *   post:
 *     summary: Adiciona um produto à wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddWishlistInput'
 *     responses:
 *       200:
 *         description: Produto adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       400:
 *         description: Erro ao adicionar produto
 *       401:
 *         description: Token não fornecido
 */
router.post("/add", addProductToWishlist);

/**
 * @swagger
 * /wishlist/remove:
 *   post:
 *     summary: Remove um produto da wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RemoveWishlistInput'
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       404:
 *         description: Wishlist não encontrada
 *       401:
 *         description: Token não fornecido
 */
router.post("/remove", removeProductFromWishlist);

/**
 * @swagger
 * /wishlist/clear/{clientId}:
 *   delete:
 *     summary: Limpa toda a lista de desejos do cliente
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: clientId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente cuja wishlist será limpa
 *     responses:
 *       200:
 *         description: Lista de Desejos limpa com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist limpa com sucesso
 *                 wishlist:
 *                   $ref: '#/components/schemas/Wishlist'
 *       404:
 *         description: Lista de Desejos não encontrada
 *       401:
 *         description: Token não fornecido
 */
router.delete("/clear/:clientId", clearWishlist);

export default router;
