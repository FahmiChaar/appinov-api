import { Module } from "@nestjs/common"
import { UserModule } from "src/users/users.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from "src/users/users.service";
// import { MongooseModule } from "@nestjs/mongoose"
// import { UserSchema } from "../users/users.model"
import { LocalStrategy } from "./local.auth";
import { User } from "src/users/users.model";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [
        UserModule, PassportModule,
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '60s' },
        }),
        TypeOrmModule.forFeature([User])
    ],
    providers: [AuthService, UsersService, LocalStrategy],
    controllers: [AuthController],
})
export class AuthModule { }