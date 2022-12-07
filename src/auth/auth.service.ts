import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) { }
    
    async validateUser(email, password): Promise<User> {
        const user = await this.usersService.find({ email });
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        if (user && passwordValid) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            user,
            token: this.jwtService.sign(payload),
        };
    }
}