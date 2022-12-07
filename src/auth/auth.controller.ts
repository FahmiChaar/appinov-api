import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private jwtService: JwtService
    ) { }

    @Post('register')
    async register(@Body() data: CreateUserDto): Promise<any> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
        const user = await this.usersService.create({ ...data, password: hashedPassword });
        return {
            user,
            token: this.jwtService.sign({ email: user.email, sub: user.id }),
        };
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req ) {
        return this.authService.login(req.user);
    }
}