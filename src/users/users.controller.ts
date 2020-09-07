/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
