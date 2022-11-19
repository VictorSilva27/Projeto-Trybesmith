import { ResultSetHeader, RowDataPacket } from 'mysql2';
import mysql from './connection';
import { IOrder } from '../interfaces/IOrder';
import UserModel from './user.model';

export default class OrderModel {
  private connection = mysql;

  public user = new UserModel();

  async getAll(): Promise<IOrder[]> {
    const [result] = await this.connection.execute<IOrder[] & RowDataPacket[]>(
      ` SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds
      FROM Trybesmith.Orders as o
      INNER JOIN Trybesmith.Products as p
      ON o.id = p.orderId
      GROUP BY o.id
      `,
    );
    
    return result;
  }

  async insert(idUser: number) {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [idUser],
    );
    return insertId;
  }
}