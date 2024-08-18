import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, PartialProductDTO } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ProductsService } from 'src/products/products.service';
import { OrderDetailsService } from 'src/order-details/order-details.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDetailDto } from 'src/order-details/dto/create-order-detail.dto';
import { OrderResponseDto } from './dto/response-order.dto';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
    private readonly productService: ProductsService,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Start transaction
    const result = await this.orderRepository.manager.transaction(async (manager: EntityManager) => {
      // Create and save the order
      const order = manager.create(Order, {
        user: user,
        date: new Date(),
      });
      const orderEntity = await manager.save(order);

      // Calculate the total price
      const total = await this.calculateTotal(products);

      // Create and save the order detail
      const orderDetail = manager.create(OrderDetail, {
        price: total,
        products: products,
        order: orderEntity,
      });

      const orderDetailEntity = await manager.save(orderDetail);

      return new OrderResponseDto(orderDetailEntity);
    });

    return result;
  }

  private async calculateTotal(products: Array<PartialProductDTO>): Promise<number> {
    let total = 0;
    for (const product of products) {
      total += await this.productService.buyProduct(product.id);
    }
    return total;
  }

  async findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const orderDetail = await this.orderDetailsService.findOneByOrderId(
      order.id,
      ['products', 'order'],
    );
    return orderDetail;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const updatedOrder = { ...order, ...updateOrderDto };

    await this.orderRepository.save(updatedOrder);
    return this.findOne(id);
  }

  async remove(id: string) {
    // Start transaction
    await this.orderRepository.manager.transaction(async (manager: EntityManager) => {
      const order = await manager.findOne(Order, { where: { id }, relations: ['orderDetails'] });
      if (!order) {
        throw new NotFoundException('Order not found');
      }

      // Elimina primero los detalles de la orden si existen
      if (order.orderDetails) {
        await manager.remove(order.orderDetails);
      }

      // Luego elimina la orden
      await manager.remove(order);
    });

    return { message: 'Order removed successfully' };
  }
}
