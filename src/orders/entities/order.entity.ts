import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @ApiProperty({
    description: 'Identificador único de la orden',
    type: String,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Usuario asociado a la orden',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({
    description: 'Fecha de creación de la orden',
    type: Date,
    example: '2024-07-06T12:00:00Z',
  })
  @Column()
  date: Date;

  @ApiProperty({
    description: 'Detalle de la orden asociado a la orden',
    type: () => OrderDetail,
  })
  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order, { onDelete: 'CASCADE' })
  orderDetails: OrderDetail;
}
