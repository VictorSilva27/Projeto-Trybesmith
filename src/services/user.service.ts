import jsonwebtoken from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';
import { ILogin } from '../interfaces/ILogin';
import UserModel from '../models/user.model';

export default class ProductService {
  public user = new UserModel();

  public jwt = jsonwebtoken;

  public async loginUser(loginBody: ILogin) {
    const user = await this.user.getUserByUsernameAndPassword(loginBody);
    return this.generateToken(user[0]);
  }

  public async insert(body: IUser): Promise<string> {
    const userID = await this.user.insertUser(body);
    return this.generateToken(userID);
  }

  public generateToken(user: IUser) {
    const payload = { id: user.id, username: user.username };
    return this.jwt.sign(
      payload, 
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '1d' },
    );
  }
}