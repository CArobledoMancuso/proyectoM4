import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { UserModule } from 'src/user/user.module';
import { ProductsModule } from 'src/products/products.module';
import { OrderDetailsModule } from 'src/order-details/order-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, User, Product]),
    UserModule,
    ProductsModule,
    OrderDetailsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}