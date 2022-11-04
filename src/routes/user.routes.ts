import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const userController = new UserController();

router.post('/', userController.loginUser.bind(userController));
// router.post('/', userController.insertUser.bind(userController));

export default router;
