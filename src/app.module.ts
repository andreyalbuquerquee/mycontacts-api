import { Module } from '@nestjs/common';
import { CategoriesModule } from './modules/categories/categories.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [ContactsModule, CategoriesModule],
})
export class AppModule {}
