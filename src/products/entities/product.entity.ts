import { ApiProperty } from '@nestjs/swagger';
import { Category } from "src/categories/entities/category.entity";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    description: 'Identificador único del producto',
    type: String,
    format: 'uuid',
    example: 'a5f5e2c4-b27b-42d2-bd39-9d4d6f1b7c70', // Ejemplo de UUID
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del producto',
    type: String,
    maxLength: 50,
    nullable: false,
    example: 'Smartphone', // Ejemplo de nombre
  })
  @Column({ length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    type: String,
    nullable: false,
    example: 'Un smartphone con pantalla de 6.5 pulgadas y 128GB de almacenamiento', // Ejemplo de descripción
  })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    type: Number,
    nullable: false,
    example: 299.99, // Ejemplo de precio
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number;

  @ApiProperty({
    description: 'Stock del producto',
    type: Number,
    nullable: false,
    example: 50, // Ejemplo de stock
  })
  @Column({ nullable: false })
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    type: String,
    nullable: true,
    default: 'default_image_url',
    example: 'https://example.com/default_image.jpg', // Ejemplo de URL de imagen
  })
  @Column({ nullable: true, default: 'default_image_url' })
  imgUrl: string;

  @ApiProperty({
    description: 'Categoría del producto',
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty({
    description: 'Detalles de orden asociados al producto',
    type: () => [OrderDetail],
  })
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}
