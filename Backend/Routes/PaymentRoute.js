import express from 'express';
import { createCheckoutSession, handleStripeWebhook } from '../Controller/PaymentController.js'; 
import { authenticateToken } from '../Middleware/authMiddleware.js';

const router = express.Router();
router.post(
  '/create-checkout-session',
  authenticateToken,
  createCheckoutSession
);
router.post(
  '/stripe-webhook',
  express.raw({ type: 'application/json' }),
  handleStripeWebhook
);

export default router;