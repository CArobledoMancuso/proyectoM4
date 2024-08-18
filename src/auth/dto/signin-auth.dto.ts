import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInAuthDto {
  @ApiProperty({
    type: String,
    description: 'El correo electrónico del usuario',
    example: 'juan.perez@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'La contraseña del usuario',
    example: 'Password123!',
  })
  @IsNotEmpty()
  password: string;
}