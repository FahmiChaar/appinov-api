import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.model';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';

@Controller('books')
export class BooksController {

    constructor(
        private booksService: BooksService
    ) {}

    @Get()
    index(): Promise<Book[]> {
        return this.booksService.findAll()
    }
    
    @Post()
    create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.create(createBookDto)
    }
    
    @Put(':id')
    update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        return this.booksService.update(id, updateBookDto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.booksService.remove(id);
    }

}
