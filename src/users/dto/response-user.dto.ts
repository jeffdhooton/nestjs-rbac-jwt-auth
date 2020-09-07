export class ResponseUserDto {
  readonly id: number;
  readonly email: string;
  readonly name?: string;
  accessToken?: string;
}
