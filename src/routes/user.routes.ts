import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateUsername from '../middlewares/validateUsername';
import validateClasse from '../middlewares/validateClasse';
import validateLevel from '../middlewares/validateLevel';
import validatePassword from '../middlewares/validatePassword';

const router = Router();

const userController = new UserController();

router.post(
  '/', 
  validateUsername,
  validateClasse,
  validateLevel,
  validatePassword, 
  userController.createUser.bind(userController),
);

export default router;
