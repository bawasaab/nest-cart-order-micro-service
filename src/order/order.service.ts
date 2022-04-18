import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const createdUser = new this.orderModel(createOrderDto);
      return await createdUser.save();
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async findAll() {
    try {
      const user = await this.orderModel.find().exec();
      if (!user) {
        throw new NotFoundException('Order not found');
      }
      return user;
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async findOne(id: ObjectId) {
    try {
      const user = await this.orderModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('Order not found');
      }
      return user;
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async update(id: ObjectId, updateOrderDto: UpdateOrderDto) {
    try {
      const updatedUser = await this.orderModel.findById(id).exec();
      if (!updatedUser) {
        throw new NotFoundException('Cart not found');
      }
      if (updateOrderDto.user_id) {
        updatedUser.user_id = updateOrderDto.user_id;
      }
      if (updateOrderDto.product_id) {
        updatedUser.product_id = updateOrderDto.product_id;
      }
      if (updateOrderDto.qty) {
        updatedUser.qty = +updateOrderDto.qty;
      }
      if (updateOrderDto.price) {
        updatedUser.price = +updateOrderDto.price;
      }
      return updatedUser.save();
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async remove(id: ObjectId) {
    try {
      await this.orderModel.findById(id).exec();
      // await this.orderModel.findOne({ _id: id }).exec();
      const user = await this.orderModel.deleteOne({ _id: id }).exec();
      return user;
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }
}
