import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Model } from 'mongoose';
import { User } from './users.model';
import { CreateUserDto } from '../auth/dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async create(userData: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user).catch((e) => {
            if (e.code === 'ER_DUP_ENTRY') {
                throw new BadRequestException(
                    'Account with this email already exists.',
                );
            }
            return e;
        })
    }

    async find(query: object): Promise<User> {
        return this.userRepository.findOneBy(query);
    }
}