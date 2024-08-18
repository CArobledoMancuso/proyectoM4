import { OrderDetail } from 'src/order-details/entities/order-detail.entity';

export class OrderResponseDto {
  id: string;
  price: number;
  products: object[];
  order: {
    id: string;
    date: Date;
    user: {
      id: string;
    };
  };

  constructor(orderDetail: OrderDetail) {
    this.id = orderDetail.id;
    this.price = orderDetail.price;
    this.products = orderDetail.products;
    this.order = {
      id: orderDetail.order.id,
      date: orderDetail.order.date,
      user: {
        id: orderDetail.order.user.id,
      },
    };
  }
}
