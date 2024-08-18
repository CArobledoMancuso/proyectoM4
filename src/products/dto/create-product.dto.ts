import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'El nombre del producto',
    maxLength: 50,
    required: true,
    example: 'Smartphone XYZ', // Ejemplo de nombre del producto
  })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'La descripción del producto',
    required: true,
    example: 'Smartphone con pantalla de 6.5 pulgadas y 128GB de almacenamiento', // Ejemplo de descripción del producto
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'El precio del producto',
    required: true,
    example: 299.99, // Ejemplo de precio del producto
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    type: Number,
    description: 'El stock del producto',
    required: true,
    example: 50, // Ejemplo de stock del producto
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    type: String,
    description: 'La URL de la imagen del producto',
    required: false,
    example: 'https://example.com/images/smartphone_xyz.jpg', // Ejemplo de URL de imagen
  })
  @IsString()
  @IsOptional()
  imgUrl?: string;
}
