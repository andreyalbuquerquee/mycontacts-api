import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    
    const { name } = createCategoryDto;

    const nameTaken = await this.categoriesRepo.findUnique({
      where: { name },
      select: { id: true }
    })

    if (nameTaken) {
      throw new ConflictException('Esse nome já está em uso!')
    }
    
    return await this.categoriesRepo.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.categoriesRepo.findMany();
  }

  async findById(id: string) {
    const category =  await this.categoriesRepo.findUnique({
      where: { id }
    });

    if (!category) {
      throw new NotFoundException('category not found')
    }

    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    
    const { name } = updateCategoryDto
    
    return this.categoriesRepo.update({
      where: { id },
      data: { name },
    });
  }

  async remove(id: string) {
    await this.categoriesRepo.delete({
      where: { id }
    });
    
    return null;
  }
}
