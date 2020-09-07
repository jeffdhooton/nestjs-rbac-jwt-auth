import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';

import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.entity';

import { AuthModule } from './auth/auth.module';

// Setup env variables
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    RolesModule,
    AuthModule,
    UsersModule,
    // Configure typeorm using environment variables
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE = 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Role],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
