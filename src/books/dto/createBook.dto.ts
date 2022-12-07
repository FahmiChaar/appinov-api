import { IsNotEmpty } from "class-validator"

export class CreateBookDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    pages: string;
    
    @IsNotEmpty()
    author: string;
}