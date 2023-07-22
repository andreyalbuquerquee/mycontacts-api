import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    await this.validateNameExistence(name);

    return await this.categoriesRepo.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.categoriesRepo.findMany();
  }

  async findById(id: string) {
    await this.validateCategoryExistence(id);
    
    const category = this.categoriesRepo.findUnique({
      where: { id },
    });

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { name } = updateCategoryDto;
    
    await this.validateCategoryExistence(id);
    
    await this.validateNameExistence(name);

    return this.categoriesRepo.update({
      where: { id },
      data: { name },
    });
  }

  async remove(id: string) {
    await this.validateCategoryExistence(id);

    await this.categoriesRepo.delete({
      where: { id }
    });
    
    return null;
  }

  private async validateNameExistence(name: string) {
    const nameTaken = await this.categoriesRepo.findUnique({
      where: { name },
    });

    if (nameTaken) {
      throw new ConflictException('Nome de categoria já existe!');
    }
  }
  
  private async validateCategoryExistence (id: string) {
    const category = await this.categoriesRepo.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada!');
    }
  }
}
