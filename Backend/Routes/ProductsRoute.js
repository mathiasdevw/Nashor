import express from 'express';
import ProductController from '../Controller/ProductsController.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';
import { authenticateManager } from '../Middleware/managerMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *         sizes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               size:
 *                 type: string
 *               quantity:
 *                 type: integer
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *         sizes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               size:
 *                 type: string
 *               quantity:
 *                 type: integer
 *         images:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', ProductController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtém um produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Dados do produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', ProductController.getProductById);

router.use(authenticateToken, authenticateManager);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto (apenas managers)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Erro na criação do produto
 *       403:
 *         description: Acesso negado
 */
router.post('/', ProductController.createProduct); // CREATE

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza informações básicas de um produto (apenas managers)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *       403:
 *         description: Acesso negado
 */
router.put('/:id', ProductController.updateProductInfo);  // UPDATE (informacoes basicas)

/**
 * @swagger
 * /api/products/stock/{id}:
 *   patch:
 *     summary: Atualiza o estoque de um produto por tamanho (apenas managers)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - size
 *               - quantity
 *             properties:
 *               size:
 *                 type: string
 *                 description: Tamanho do produto
 *               quantity:
 *                 type: integer
 *                 description: Quantidade em estoque
 *     responses:
 *       200:
 *         description: Estoque atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto ou tamanho não encontrado
 *       403:
 *         description: Acesso negado
 */
router.patch('/stock/:id', ProductController.updateStockBySize);// UPDATE (Estoque)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deleta um produto (apenas managers)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       403:
 *         description: Acesso negado
 */
router.delete('/:id', ProductController.deleteProduct); // DELETE

export default router;
