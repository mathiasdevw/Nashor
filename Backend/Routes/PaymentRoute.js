import express from 'express';
import { createCheckoutSession, handleStripeWebhook } from '../Controller/PaymentController.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CheckoutSession:
 *       type: object
 *       properties:
 *         sessionId:
 *           type: string
 *         url:
 *           type: string
 *           description: URL do checkout do Stripe
 */

/**
 * @swagger
 * /payment/create-checkout-session:
 *   post:
 *     summary: Cria uma sessão de checkout no Stripe
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     size:
 *                       type: string
 *     responses:
 *       200:
 *         description: Sessão de checkout criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckoutSession'
 *       400:
 *         description: Erro na criação da sessão
 *       401:
 *         description: Token não fornecido
 */
router.post(
  '/create-checkout-session',
  authenticateToken,
  createCheckoutSession
);

/**
 * @swagger
 * /payment/stripe-webhook:
 *   post:
 *     summary: Webhook do Stripe para eventos de pagamento
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Dados do webhook do Stripe
 *     responses:
 *       200:
 *         description: Webhook processado com sucesso
 *       400:
 *         description: Erro no processamento do webhook
 */
router.post(
  '/stripe-webhook',
  express.raw({ type: 'application/json' }),
  handleStripeWebhook
);

export default router;
