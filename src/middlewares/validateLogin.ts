import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const userModel = new UserModel();
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: '"username" is required' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  const user = await userModel.getUserByUsernameAndPassword(req.body);
  if (user?.length === 0) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }
  return next();
};

export default validateLogin;