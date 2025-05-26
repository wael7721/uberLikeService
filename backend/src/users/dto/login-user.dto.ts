import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  identifier: string; // could be email or phone

  @IsNotEmpty()
  @IsString()
  password: string;
}