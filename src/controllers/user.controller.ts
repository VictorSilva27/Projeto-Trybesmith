import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { ILogin } from '../interfaces/ILogin';

export default class UserController {
  public userService = new UserService();

  async createUser(req: Request, res: Response) {
    const { body } = req;
    const token = await this.userService.insert(body);
    res.status(201).json({ token });
  }

  async loginUser(req: Request<object, object, ILogin>, res: Response) {
    const { body } = req;
    const token = await this.userService.loginUser(body);
    res.status(200).json({ token });
  }
}