import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  /**
   * Middleware Guard function for determining whether or not
   * a user has the correct roles to access a specific endpoint
   *
   * @param context ExecutionContext
   *
   * @returns Promise<boolean> true for allowed, false for not allowed
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const fullUser = await this.usersService.findById(user.id);
    const userRole = fullUser.role.name;

    return this.matchRoles(roles, userRole);
  }

  /**
   * Matches a user role to the allowed roles for the endpoint
   *
   * @param roles roles for the route
   * @param userRole role attached to the user object
   *
   * @returns boolean true for match, false for not match
   */
  matchRoles(roles: string[], userRole: string): boolean {
    const exists = roles.find(role => role === userRole);
    if (!exists) return false;

    return true;
  }
}
