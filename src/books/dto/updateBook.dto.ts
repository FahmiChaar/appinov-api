import { IsNotEmpty } from "class-validator"

export class UpdateBookDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    pages: string;
    
    @IsNotEmpty()
    author: string;
}