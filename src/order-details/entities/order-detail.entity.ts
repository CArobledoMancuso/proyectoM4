import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OrderDetail {
  @ApiProperty({
    description: 'Identificador único de detalle de la orden',
    type: String,
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Precio del producto en el detalle de la orden',
    type: Number,
  })
  @Column()
  price: number;

  @ApiProperty({
    description: 'Orden asociada al detalle de la orden',
    type: () => Order,
  })
  @OneToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn()
  order: Order;

  @ApiProperty({
    description: 'Lista de productos en el detalle de la orden',
    type: [Product],
  })
  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable()
  products: Product[];
}
