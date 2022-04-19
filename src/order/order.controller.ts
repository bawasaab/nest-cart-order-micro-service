import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ObjectId } from 'mongoose';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @EventPattern('createOrder')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @MessagePattern({ cmd: 'findAllOrder' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @MessagePattern({ cmd: 'findOneOrder' })
  findOne(@Body('id') id: ObjectId) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @EventPattern('updateOrder')
  update(@Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(updateOrderDto.id, updateOrderDto);
  }

  @Delete(':id')
  @EventPattern('removeOrder')
  remove(@Body('id') id: ObjectId) {
    return this.orderService.remove(id);
  }
}
