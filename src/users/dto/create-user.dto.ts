import { IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly name?: string;

  @IsNumber()
  roleId?: number;
}
