import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ContactsRepository } from './repositories/contacts.repository';
import { CategoriesRepository } from './repositories/categories.repository';

@Global()
@Module({
  providers: [PrismaService, ContactsRepository, CategoriesRepository],
  exports: [ContactsRepository, CategoriesRepository]
})
export class DatabaseModule {}
