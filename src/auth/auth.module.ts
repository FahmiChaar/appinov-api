import { Module } from "@nestjs/common"
import { UserModule } from "src/users/users.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from "src/users/users.service";
import { LocalStrategy } from "./local.auth";
import { User } from "src/users/users.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "./jwt.strategy";


@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            // I should replace 'secretKey' with generated key from .env but it's only for the Test
            secret: 'secretKey',
            signOptions: { expiresIn: '60s' },
        }),
        TypeOrmModule.forFeature([User])
    ],
    providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }