import { Request, Response } from 'express';
import OrderService from '../services/order.service';

require('dotenv/config');

export default class OrderController {
  public orderService = new OrderService();

  async getAll(_req: Request, res: Response) {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  }

  async insertOrder(req: Request, res: Response) {
    const { productsIds } = req.body;
    const { user } = req.body;
    const result = await this.orderService.insert(productsIds, user.id);
    
    res.status(201).json(result);
  }
}