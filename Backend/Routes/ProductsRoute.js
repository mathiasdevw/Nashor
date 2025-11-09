import express from 'express';
import ProductController from '../Controller/ProductsController.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';
import { authenticateManager } from '../Middleware/managerMiddleware.js';

const router = express.Router();

//Rotas que qualquer usuario pode acessar
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);


router.use(authenticateToken, authenticateManager);
//Rotas de manager 
router.post('/', ProductController.createProduct); // CREATE
router.put('/:id', ProductController.updateProductInfo);  // UPDATE (informacoes basicas)
router.patch('/stock/:id', ProductController.updateStockBySize);// UPDATE (Estoque)
router.delete('/:id', ProductController.deleteProduct); // DELETE

export default router;