import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    type: String,
    description: 'El UUID del usuario, asignado por la base de datos',
    required: true,
    example: 'a5f5e2c4-b27b-42d2-bd39-9d4d6f1b7c70', // Ejemplo de UUID
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'El nombre del usuario',
    required: true,
    example: 'Juan Pérez', // Ejemplo de nombre
  })
  @Column({
    length: 100,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'La contraseña del usuario',
    required: true,
    example: 'Password123!', // Ejemplo de contraseña (no es recomendable mostrar contraseñas reales)
  })
  @Column()
  password: string;

  @ApiProperty({
    type: String,
    description: 'El correo electrónico del usuario',
    required: true,
    example: 'juan.perez@example.com', // Ejemplo de correo electrónico
  })
  @Column()
  email: string;

  @ApiProperty({
    type: String,
    description: 'La dirección del usuario',
    required: true,
    example: 'Calle Falsa 123, Ciudad', // Ejemplo de dirección
  })
  @Column()
  address: string;

  @ApiProperty({
    type: String,
    description: 'El teléfono del usuario',
    required: true,
    example: '+1234567890', // Ejemplo de teléfono
  })
  @Column()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'El país del usuario',
    required: false,
    example: 'España', // Ejemplo de país
  })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({
    type: String,
    description: 'La ciudad del usuario',
    required: false,
    example: 'Madrid', // Ejemplo de ciudad
  })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({
    type: () => Order,
    isArray: true,
    description: 'Los pedidos realizados por el usuario',
    required: false,
  })
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @ApiProperty({
    type: String,
    description: 'La fecha de creación del usuario',
    required: true,
    example: '2024-07-06T12:34:56Z', // Ejemplo de fecha en formato ISO
  })
  @Column()
  createdAt: string;

  @ApiProperty({
    type: Boolean,
    description: 'Si el usuario es administrador o no',
    required: true,
    default: false,
    example: false, // Ejemplo de valor booleano
  })
  @Column({ default: false })
  admin: boolean; // Nuevo campo
}
