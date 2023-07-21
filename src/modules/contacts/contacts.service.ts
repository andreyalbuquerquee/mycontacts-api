import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from 'src/shared/database/repositories/contacts.repository';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class ContactsService {
  constructor(private readonly contactsRepo: ContactsRepository,
    private readonly categoriesRepo: CategoriesRepository) {}

  async create(createContactDto: CreateContactDto) {
    const { name, email, number, categoryId } = createContactDto
    
    if (categoryId) {
      await this.validateCategoryExistence(categoryId)
    } 

    return await this.contactsRepo.create({
      data: { name, email, number, categoryId }
    });
  }

  async findAll() {
    return await this.contactsRepo.findMany();
  }

  async findById(id: string) {
    
    await this.validateContactExistence(id)

    return await this.contactsRepo.findUnique({
      where: { id },
    });

  }

  async updateById(id: string, updateContactDto: UpdateContactDto) {
    await this.validateContactExistence(id);
    
    const { name, email, number, categoryId } = updateContactDto;
    
    if (categoryId) {
    await this.validateCategoryExistence(categoryId)
    } 
      
    return await this.contactsRepo.update({
      where: { id },
      data: { name, email, number, categoryId },
    })
  }

  async deleteById(id: string) {
    await this.validateContactExistence(id);
    
    await this.contactsRepo.delete({
      where: { id },
    });
    
    return null;
  }

  private async validateCategoryExistence(id: string) {
    const category =  await this.categoriesRepo.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada!');
    }
  }

  private async validateContactExistence(id: string) {
    const contact =  await this.contactsRepo.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException('Contato não encontrado!');
    }
  }
}
