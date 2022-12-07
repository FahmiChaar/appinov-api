import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.model';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {

    constructor(
        private booksService: BooksService
    ) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    index(): Promise<Book[]> {
        return this.booksService.findAll()
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.create(createBookDto)
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        return this.booksService.update(id, updateBookDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.booksService.remove(id);
    }

}
