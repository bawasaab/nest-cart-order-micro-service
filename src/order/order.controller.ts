import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ObjectId } from 'mongoose';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @MessagePattern('createOrder')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @MessagePattern('findAllOrder')
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @MessagePattern('findOneOrder')
  findOne(@Param('id') id: ObjectId) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @MessagePattern('updateOrder')
  update(@Body() updateOrderDto: UpdateOrderDto, @Param('id') id: ObjectId) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @MessagePattern('removeOrder')
  remove(@Param('id') id: ObjectId) {
    return this.orderService.remove(id);
  }
}
