import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { UploadFileDto } from 'src/file-upload/dto/upload-file.dto';


@Injectable()
export class CloudinaryService {
  constructor() {
    dotenv.config();
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile({ buffer, originalname }: UploadFileDto): Promise<string> {
    const options: UploadApiOptions = {
      folder: 'uploads',
      public_id: originalname,
      resource_type: 'auto',
    };

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
        //return secure url
        error ? reject(error) : resolve(result.secure_url);
      });
      stream.write(buffer);
      stream.end();
    });
  }

  async getUrl(publicId: string): Promise<string> {
    try {
      const result = await cloudinary.api.resource(publicId);
      return result.secure_url; // Asegúrate de devolver la URL segura
    } catch (error) {
      throw new Error(`Failed to retrieve resource: ${error.message}`);
    }
  }
}
