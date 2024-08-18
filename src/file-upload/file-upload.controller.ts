import {
  Controller,
  Post,
  Param,
  UseGuards,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FileValidationPipe } from 'src/pipes/image-upload/image-upload.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/decorator/roles/roles.decorator';
import { Role } from 'src/user/enum/role.enum';

@ApiTags('file-upload') // Etiqueta para agrupar las rutas en Swagger
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin) // Sólo accesible por administradores
  @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  @ApiOperation({ summary: 'Subir una imagen para un pedido específico' }) // Descripción de la operación
  @ApiParam({
    name: 'id',
    description: 'ID del pedido al que se le asociará la imagen',
    type: String,
  })
  @ApiBody({
    description: 'Imagen que se subirá',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de imagen a subir',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen subida exitosamente',
    schema: {
      type: 'object',
      properties: {
        imgUrl: {
          type: 'string',
          description: 'URL de la imagen subida',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta, archivo no proporcionado',
  })
  async uploadImage(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const { imgUrl } = await this.fileUploadService.uploadFile(file, id);
    return { imgUrl };
  }
}
