import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
    const orderDetail = this.orderDetailRepository.create(createOrderDetailDto);
    return this.orderDetailRepository.save(orderDetail);
  }

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailRepository.find();
  }

  async findOne(id: string): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailRepository.findOne({ where: { id } });
    if (!orderDetail) {
      throw new NotFoundException(`Order detail with ID ${id} not found`);
    }
    return orderDetail;
  }

  async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto): Promise<OrderDetail> {
    const orderDetail = await this.findOne(id);
    const updatedOrderDetail = this.orderDetailRepository.merge(orderDetail, updateOrderDetailDto);
    return this.orderDetailRepository.save(updatedOrderDetail);
  }

  async remove(id: string): Promise<{ message: string }> {
    const orderDetail = await this.findOne(id);
    await this.orderDetailRepository.delete(id);
    return { message: 'Order detail removed successfully' };
  }

  async findOneByOrderId(orderId: string, relations: string[] = []): Promise<OrderDetail | null> {
    return this.orderDetailRepository.findOne({
      where: { order: { id: orderId } },
      relations: relations,
    });
  }
}
