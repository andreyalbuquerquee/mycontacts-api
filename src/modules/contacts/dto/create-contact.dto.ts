import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateContactDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    number: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    categoryId: string;
}
