import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Data is not valid' })
  email: string;

  @IsNotEmpty({ message: 'Data is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}