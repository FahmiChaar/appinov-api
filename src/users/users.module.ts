import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from "./users.model"
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  controllers: []
})
export class UserModule { }