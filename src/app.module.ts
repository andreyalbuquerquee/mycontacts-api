import { Module } from '@nestjs/common';
import { CategoriesModule } from './modules/categories/categories.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [ContactsModule, CategoriesModule, DatabaseModule],
})
export class AppModule {}
