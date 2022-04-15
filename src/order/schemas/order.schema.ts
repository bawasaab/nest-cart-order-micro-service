import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  user_id: string;

  @Prop()
  product_id: string;

  @Prop()
  qty: number;

  @Prop()
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
