import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { productsMock } from './products-mock';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsSeed {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findCategoryByName(category: string) {
    const foundCategory = await this.categoryRepository.findOne({
      where: { name: category },
    });
    if (!foundCategory) {
      throw new Error(`Category ${category} not found`);
    }
    return foundCategory;
  }

  async seed() {
    // Obtener todos los nombres de productos existentes de una vez
    const existingProductNames = (await this.productRepository.find()).map(
      (product) => product.name,
    );

    // Usar for...of para asegurar la ejecución secuencial de las operaciones asíncronas
    for (const productData of productsMock) {
      // Verificar si el producto actual existe en el conjunto de resultados
      if (!existingProductNames.includes(productData.name)) {
        const product = new Product();
        product.name = productData.name;
        product.description = productData.description;
        product.price = productData.price;
        product.stock = productData.stock;
        product.category = await this.findCategoryByName(productData.category);
        await this.productRepository.save(product);
      }
    }
  }
}