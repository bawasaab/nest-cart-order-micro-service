import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [OrderModule, MongooseModule.forRoot('mongodb://localhost/orderdb')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
