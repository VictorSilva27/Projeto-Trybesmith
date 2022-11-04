import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { ILogin } from '../interfaces/ILogin';

export default class UserController {
  public userService = new UserService();

  // async insertUser(req: Request, res: Response) {
  //   const products = await this.userService.insert();
  //   res.status(200).json(products);
  // }
  async loginUser(req: Request<object, object, ILogin>, res: Response) {
    const { body } = req;
    const token = await this.userService.loginUser(body);
    res.status(200).json({ token });
  }
}