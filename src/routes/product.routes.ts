import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import validateName from '../middlewares/validateName';
import validateAmount from '../middlewares/validateAmount';

const router = Router();

const productController = new ProductController();

router.get('/', productController.getAll.bind(productController));
router.post(
  '/', 
  validateName, 
  validateAmount,
  productController.postProduct.bind(productController),
);

export default router;
