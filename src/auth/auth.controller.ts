import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller()
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('register')
    async register(
        @Body() data: CreateUserDto
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
        const result = await this.usersService.create({ ...data, password: hashedPassword });
        return result;
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req ) {
        return this.authService.login(req.user);
    }
}