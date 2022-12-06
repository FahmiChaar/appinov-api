import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>
) { }
    async createUser(username: string, password: string): Promise<User> {
        return this.userRepository.create({
            username,
            password,
        });
    }
    async getUser(query: object ): Promise<User> {
        return this.userRepository.findOne(query);
    }
}