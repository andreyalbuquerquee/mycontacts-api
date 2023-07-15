import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator";

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
    @IsPhoneNumber("BR")
    number: string;
    
    @IsOptional()
    @IsString()
    @IsUUID()
    categoryId: string;
}
