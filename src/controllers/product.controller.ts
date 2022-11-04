import { Request, Response } from 'express';

import ProductService from '../services/product.service';

export default class ProductController {
  public productService = new ProductService();

  async getAll(_req: Request, res: Response) {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  }

  // async postProduct(req: Request, res: Response) {
  //   const { name, amount } = req.body;
  //   const products = await this.productService.insertProduct(name, amount);
  //   res.status(201).json(products);
  // }
}