import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    description: 'Nombre del campo en el formulario donde se carga el archivo',
    example: 'file',
  })
  fieldname: string;

  @ApiProperty({
    description: 'Nombre original del archivo cargado',
    example: 'example.jpg',
  })
  originalname: string;

  @ApiProperty({
    description: 'Tipo MIME del archivo cargado',
    example: 'image/jpeg',
  })
  mimetype: string;

  @ApiProperty({
    description: 'Tamaño del archivo en bytes',
    example: 123456,
  })
  size: number;

  @ApiProperty({
    description: 'Buffer de datos del archivo cargado',
    type: 'string',
    format: 'binary',
    example: '...binary data...',
  })
  buffer: Buffer;
}
