import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    type: String,
    description: 'El UUID del usuario, asignado por la base de datos',
    required: true,
    example: 'a5f5e2c4-b27b-42d2-bd39-9d4d6f1b7c70', // Ejemplo de UUID
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'El nombre del usuario',
    required: true,
    example: 'Juan Pérez', // Ejemplo de nombre
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'El correo electrónico del usuario',
    required: true,
    example: 'juan.perez@example.com', // Ejemplo de correo electrónico
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'La dirección del usuario',
    required: true,
    example: 'Calle Falsa 123, Ciudad', // Ejemplo de dirección
  })
  address: string;

  @ApiProperty({
    type: String,
    description: 'El teléfono del usuario',
    required: true,
    example: '+1234567890', // Ejemplo de teléfono
  })
  phone: string;

  @ApiProperty({
    type: String,
    description: 'El país del usuario',
    required: false,
    example: 'España', // Ejemplo de país
  })
  country?: string;

  @ApiProperty({
    type: String,
    description: 'La ciudad del usuario',
    required: false,
    example: 'Madrid', // Ejemplo de ciudad
  })
  city?: string;

  @ApiProperty({
    type: String,
    description: 'La fecha de creación del usuario',
    required: true,
    example: '2024-07-06T12:34:56Z', // Ejemplo de fecha en formato ISO
  })
  createdAt: string;

  @ApiProperty({
    type: Boolean,
    description: 'Si el usuario es administrador o no',
    required: true,
    example: true, // Ejemplo de valor booleano
  })
  admin: boolean;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
