import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<any> {
    // Grab context for the specific request
    const contextId = ContextIdFactory.getByRequest(request);

    // Asyncronously return request-scoped instance of AuthService
    const authService = await this.moduleRef.resolve(AuthService, contextId);

    // Validate user
    const user = await authService.validateUser(username, password);

    // If no user, throw UnauthorizedException
    if (!user) {
      throw new UnauthorizedException();
    }

    // Return user
    return user;
  }
}
