import { IsNotEmpty, IsArray, IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsArray()
  products?: Array<{ id: string; quantity: number }>;

  @IsOptional()
  @IsNumber()
  price?: number;
}
