import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { categories } from './categories-mock';

@Injectable()
export class CategoriesSeed {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed() {
    const existingCategories = await this.categoryRepository.find();
    for (const categoryName of categories) {
      if (!existingCategories.some(category => category.name === categoryName)) {
        const category = this.categoryRepository.create({ name: categoryName });
        await this.categoryRepository.save(category);
      }
    }
  }
}
