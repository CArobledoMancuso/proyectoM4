import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @ApiProperty({
    description: 'ID único de la categoría',
    example: 'e5d0b623-4c1b-4f8f-bd51-9d3a8b84de09',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Electronics',
    maxLength: 50,
  })
  @Column({ length: 50, nullable: false })
  name: string;


  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
