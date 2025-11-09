import express from 'express';
import CartController from '../Controller/CartController.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticateToken);
router.get('/', CartController.getCart);
router.post('/add', CartController.addItemToCart);
router.delete('/remove', CartController.removeItemFromCart);

export default router;