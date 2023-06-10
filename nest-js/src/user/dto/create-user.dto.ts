import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  confirmPassword?: string;

  @IsNumberString()
  weight: string;

  @IsNumberString()
  height: string;

  @IsString()
  target: string;
  username: string;
}

//export interface CreateUserDto {
//  signUpData: {
//    email: string;
//    password: string;
//    confirmPassword: string;
//    weight: string;
//    height: string;
//    target: string;
//  };
//}
