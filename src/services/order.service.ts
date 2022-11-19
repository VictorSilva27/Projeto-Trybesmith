import { IOrder } from '../interfaces/IOrder';
import OrderModel from '../models/order.model';
import ProductModel from '../models/product.model';

export default class OrderService {
  public order = new OrderModel();

  public product = new ProductModel();

  public async getAll(): Promise<IOrder[]> {
    const orders = await this.order.getAll();
    return orders;
  }

  public async insert(arrayProducts: [], idUser: number) {
    const orderId = await this.order.insert(idUser);

    const insertProductsId = arrayProducts.map(async (productId) => {
      await this.product.update(productId, orderId);
    });
    await Promise.all(insertProductsId);

    return { userId: idUser, productsIds: arrayProducts };
  }
}