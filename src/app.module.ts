import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'appinov_test',
      synchronize: true,
      dropSchema: false,
      autoLoadEntities: true
    }),
    UserModule,
    AuthModule,
    BooksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
