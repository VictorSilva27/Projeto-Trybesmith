import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import authMiddleware from '../middlewares/auth.middleware';
import validateProductsIds from '../middlewares/validateProductsIds';

const router = Router();

const orderController = new OrderController();

router.get('/', orderController.getAll.bind(orderController));
router.post(
  '/', 
  authMiddleware, 
  validateProductsIds,
  orderController.insertOrder.bind(orderController),
);

export default router;
