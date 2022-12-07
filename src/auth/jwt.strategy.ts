import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private usersService: UsersService
    ) {
        super({
            // I should replace 'secretKey' with generated key from .env but it's only for the Test
            secretOrKey: 'secretKey',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: any): Promise<User> {
        const { email, id } = payload;
        const user: User = await this.usersService.find({ email });
        if (id > 2 || Object.keys(user).length <= 0) {
            throw new UnauthorizedException();
        }

        return user;
    }
}