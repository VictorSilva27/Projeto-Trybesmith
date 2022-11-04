import { RowDataPacket } from 'mysql2';
import mysql from './connection';
import { IUser } from '../interfaces/IUser';
import { ILogin } from '../interfaces/ILogin';

export default class UserModel {
  private connection = mysql;

  public async getUserByUsernameAndPassword(login: ILogin): Promise<IUser[]> {
    const { username, password } = login;
    const [rows] = await this.connection.execute<(
    IUser[] & RowDataPacket[])>(
      ' SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
      );

    return rows;
  }

  async insertUser(nameProduct: string, amount: string) {
    // const [{ insertId }] = await this.connection.execute(
    //   ` 
    //       INSERT INTO
    //           Products (name, amount)
    //       VALUES
    //           (?, ?, ?)
    //   `,
    //   [nameProduct, amount],
    // );

    const [rows] = await this.connection.execute(`
          SELECT
              id, name, amount, orderId
          FROM Products
          WHERE id = ?
      `, [nameProduct, amount]);

    return rows;
  }
}