import { IsEmail, IsNotEmpty, MinLength, IsDateString,Length, Matches, IsIn} from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 8, { message: 'Phone number must be exactly 8 digits' })
  @Matches(/^\d+$/, { message: 'Phone number must contain only digits' })
  phone_number: string;

  @IsDateString()
  dob: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsIn(['passenger', 'taxi'], { message: 'user_role must be either passenger or taxi' })
  user_role: 'passenger' | 'taxi';

}