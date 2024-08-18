import { Controller, Get, Param, NotFoundException, Post, HttpCode, UseGuards, UseInterceptors, ParseUUIDPipe, UploadedFile, BadRequestException } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { FileValidationPipe } from 'src/pipes/image-upload/image-upload.pipe';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
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