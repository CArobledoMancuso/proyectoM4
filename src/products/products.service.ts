
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly fileUploadService: FileUploadService,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll(page: number, limit: number) {
    return await this.productRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    console.log('updateProductDto', updateProductDto);
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<{ id: string }> {
    await this.productRepository.delete(id);
    return { id };
  }

  async buyProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (product.stock === 0) {
      throw new Error('Out of stock');
    }
    await this.productRepository.update(id, {
      stock: product.stock - 1,
    });
    console.log('Product bought successfully');
    return product.price;
  }

}
