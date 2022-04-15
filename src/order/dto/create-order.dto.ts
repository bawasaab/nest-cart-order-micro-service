import { ObjectId } from 'mongoose';

export class CreateOrderDto {
  user_id: string;
  product_id: string;
  qty: number;
  price: number;
}
