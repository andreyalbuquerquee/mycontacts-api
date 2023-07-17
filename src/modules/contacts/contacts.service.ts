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
      const categoryFound = await this.validateCategoryExistence(categoryId)
  
      if (!categoryFound) {
        throw new ConflictException('Categoria não encontrada!')
      }} 

    return await this.contactsRepo.create({
      data: { name, email, number, categoryId }
    });
  }

  async findAll() {
    return await this.contactsRepo.findMany();
  }

  async findById(id: string) {
    
    const contact = await this.validateContactExistence(id)

    if (!contact) {
      throw new NotFoundException('Contado não encontrado!')
    }

    return await this.contactsRepo.findUnique({
      where: { id },
    });

  }

  async updateById(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.validateContactExistence(id);
    
    if (!contact) {
      throw new NotFoundException('Contato não encontrado!')
    }
    
    const { name, email, number, categoryId } = updateContactDto;
    
    if (categoryId) {
    const categoryFound = await this.validateCategoryExistence(categoryId)

    if (!categoryFound) {
      throw new ConflictException('Categoria não encontrada!')
    }} 
      
    return await this.contactsRepo.update({
      where: { id },
      data: { name, email, number, categoryId },
    })
  }

  async deleteById(id: string) {
    const contact = await this.validateContactExistence(id);
    
    if (!contact) {
      throw new NotFoundException('Contato não encontrado!')
    }

    await this.contactsRepo.delete({
      where: { id },
    });
    
    return null;
  }

  private validateCategoryExistence(id: string) {
    return this.categoriesRepo.findFirst({
      where: { id },
    });
  }

  private validateContactExistence(id: string) {
    return this.contactsRepo.findFirst({
      where: { id },
    });
  }


}
