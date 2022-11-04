import { RowDataPacket } from 'mysql2';
import mysql from './connection';
import { IProduct } from '../interfaces/IProduct';

export default class ProductModel {
  private connection = mysql;

  async getAll(): Promise<IProduct[]> {
    const [rows] = await this.connection.execute<IProduct[] & RowDataPacket[]>(`
        SELECT
            id, name, amount, orderId
        FROM Trybesmith.Products
    `);

    return rows;
  }

  // async insert(nameProduct: string, amount: string) {
  //   const [{ insertId }] = await this.connection.execute(
  //     ` 
  //         INSERT INTO
  //             Products (name, amount)
  //         VALUES
  //             (?, ?, ?)
  //     `,
  //     [nameProduct, amount],
  //   );

  //   const [rows] = await this.connection.execute(`
  //         SELECT
  //             id, name, amount, orderId
  //         FROM Products
  //         WHERE id = ?
  //     `, [insertId]);

  //   return rows;
  // }
}