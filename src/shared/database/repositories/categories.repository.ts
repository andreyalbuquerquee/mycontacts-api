import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class CategoriesRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createDto: Prisma.CategoryCreateArgs) {
        return this.prismaService.category.create(createDto);
    }
    
    findMany() {
        return this.prismaService.category.findMany();
    }

    findUnique(findUniqueDto: Prisma.CategoryFindFirstArgs) {
        return this.prismaService.category.findFirst(findUniqueDto);
    }

    update(updateDto: Prisma.CategoryUpdateArgs) {
        return this.prismaService.category.update(updateDto);
    }

    delete(deleteDto: Prisma.CategoryDeleteArgs) {
        return this.prismaService.category.delete(deleteDto);
    }

}