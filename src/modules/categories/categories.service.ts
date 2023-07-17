import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    
    const { name } = createCategoryDto;

    const nameTaken = await this.validateNameExistence(name);

    if (nameTaken) {
      throw new ConflictException('Nome de categoria já existe!')
    }
    
    return await this.categoriesRepo.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.categoriesRepo.findMany();
  }

  async findById(id: string) {
    const category =  await this.validateCategoryExistence(id);
    
    if (!category) {
      throw new NotFoundException('category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    
    const { name } = updateCategoryDto;
    
    const nameTaken = await this.validateNameExistence(name);

    if (nameTaken) {
      throw new ConflictException('Nome de categoria já existe!')
    }
    
    return this.categoriesRepo.update({
      where: { id },
      data: { name },
    });
  }

  async remove(id: string) {
    const category = await this.validateCategoryExistence(id)

    if (!category) {
      throw new NotFoundException('Categoria não encontrada!')
    }
    
    await this.categoriesRepo.delete({
      where: { id }
    });
    
    return null;
  }

  private validateNameExistence(name: string) {
    return this.categoriesRepo.findUnique({
      where: { name },
    });
  }
  
  private validateCategoryExistence (id: string) {
    return this.categoriesRepo.findUnique({
      where: { id },
    });
  }
}
