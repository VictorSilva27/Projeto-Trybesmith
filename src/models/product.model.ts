import { ResultSetHeader, RowDataPacket } from 'mysql2';
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

  async insert(nameProduct: string, amount: string): Promise<IProduct> {
    const result = await this.connection.execute<ResultSetHeader>(
      ` 
          INSERT INTO
          Trybesmith.Products (name, amount)
          VALUES
              (?, ?)
      `,
      [nameProduct, amount],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, name: nameProduct, amount };
  }
}