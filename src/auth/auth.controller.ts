import {
  Controller,
  Post,
  Request,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as express from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IRegistrationStatus } from './interface/registration-status.interface';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { UsersService } from 'src/users/users.service';

interface ILoginRequest extends express.Request {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IRegistrationStatus | undefined> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Request() req: ILoginRequest,
  ): Promise<ResponseUserDto | undefined> {
    const { email, password } = req.body;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.authService.validateUser(email, password);
  }
}
