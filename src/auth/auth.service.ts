import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IRegistrationStatus } from './interface/registration-status.interface';
import { IJwtPayload, IJwtReturnPayload } from './interface/jwt.interface';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a User
   *
   * @param user CreateUserDto
   */
  async register(
    user: CreateUserDto,
  ): Promise<IRegistrationStatus | undefined> {
    let status: IRegistrationStatus = {
      success: true,
      message: 'User registered',
    };

    try {
      await this.usersService.register(user);
    } catch (err) {
      status = { success: false, message: err.message };
    }

    return status;
  }

  /**
   * Create a JWT accessToken for the user
   * @param user User
   */
  createToken(user: User): IJwtReturnPayload {
    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    return {
      accessToken,
    };
  }

  /**
   * Validate a user's token
   *
   * @param payload IJwtPayload
   */
  async validateUserToken(payload: IJwtPayload): Promise<User> {
    return await this.usersService.findById(payload.id);
  }

  /**
   * Validate a user
   *
   * @param email string
   * @param password string
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<ResponseUserDto | undefined> {
    const user = await this.usersService.findByEmail(email);

    // Compare user password
    if (user && user.comparePassword(password)) {
      const { password, ...result } = user;

      const accessToken = this.jwtService.sign({
        id: user.id,
        email: user.email,
      });

      return { ...result, accessToken };
    }

    return;
  }
}
