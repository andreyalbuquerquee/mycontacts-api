import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";



@Injectable()
export class ContactsRepository {
    constructor(private readonly prismaService: PrismaService) {}


    create(createDto: Prisma.ContactCreateArgs) {
        return this.prismaService.contact.create(createDto);
    }
    
    findMany() {
        return this.prismaService.contact.findMany();
    }
    
    findUnique(findUniqueDto: Prisma.ContactFindUniqueArgs) {
        return this.prismaService.contact.findUnique(findUniqueDto);
    }

    update(updateDto: Prisma.ContactUpdateArgs) {
        return this.prismaService.contact.update(updateDto);
    }

    delete(deleteDto: Prisma.ContactDeleteArgs) {
        return this.prismaService.contact.delete(deleteDto);
    }
}

