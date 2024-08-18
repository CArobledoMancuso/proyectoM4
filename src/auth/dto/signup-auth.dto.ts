import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpAuthDto {

  @ApiProperty({
    type: String,
    description: 'El nombre del usuario',
    maxLength: 80,
    minLength: 3,
    example: 'Juan Pérez',
  })
  @MaxLength(80)
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  name: string;

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
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una minúscula, una mayúscula, un número, un caracter especial (= !@#$%^&*) y tener entre 8 y 15 caracteres',
    },
  )
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Confirmación de la contraseña del usuario',
    example: 'Password123!',
  })
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;

  @ApiProperty({
    type: String,
    description: 'La dirección del usuario',
    example: '123 Calle Principal',
  })
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    description: 'El teléfono del usuario',
    example: '+1234567890',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'El país del usuario',
    example: 'Argentina',
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    type: String,
    description: 'La ciudad del usuario',
    example: 'Buenos Aires',
    required: false,
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    type: String,
    description: 'La fecha de creación del usuario',
    example: '2024-07-06T12:00:00Z',
    required: false,
  })
  @IsString()
  @IsOptional()
  createdAt: string;

  constructor(partial: Partial<SignUpAuthDto>) {
    Object.assign(this, partial);
  }
}