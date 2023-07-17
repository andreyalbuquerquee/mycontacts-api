import { Injectable, NotFoundException } from '@nestjs/common';
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
    
    return await this.contactsRepo.create({
      data: { name, email, number, categoryId }
    });
  }

  async findAll() {
    return await this.contactsRepo.findMany();
  }

  async findById(id: string) {
    return await this.contactsRepo.findUnique({
      where: { id },
    });

  }

  async updateById(id: string, updateContactDto: UpdateContactDto) {
    const { name, email, number, categoryId } = updateContactDto;

    return await this.contactsRepo.update({
      where: { id },
      data: { name, email, number, categoryId },
    })
  }

  async deleteById(id: string) {
    await this.contactsRepo.delete({
      where: { id },
    });
    
    return null;
  }


}
