import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { MongooseModule } from "@nestjs/mongoose"
import { User } from "./users.model"
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UserModule { }