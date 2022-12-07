import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/createBook.dto';
import { Book } from '../books/books.model';
import { UpdateBookDto } from './dto/updateBook.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>
    ) { }

    async create(data: CreateBookDto): Promise<Book> {
        const book = this.bookRepository.create(data);
        return await this.bookRepository.save(book)
    }
    
    async update(id: number, data: UpdateBookDto): Promise<Book> {
        let book = await this.find({ id });
        if (!book) {
            throw new NotAcceptableException('Could not find the book');
        }
        book = {...book, ...data}
        return await this.bookRepository.save(book)
    }

    find(query: object): Promise<Book> {
        return this.bookRepository.findOneBy(query);
    }
    
    findAll(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    async remove(id: number): Promise<void> {
        await this.bookRepository.delete(id)
    }
}