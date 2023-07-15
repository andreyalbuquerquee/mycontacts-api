import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.contactsService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.updateById(id, updateContactDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.contactsService.deleteById(id);
  }
}
