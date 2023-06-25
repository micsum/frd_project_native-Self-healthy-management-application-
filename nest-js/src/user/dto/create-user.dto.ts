import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  MinLength,
  Min,
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
  @Min(10)
  weight: string;

  @IsNumberString()
  @Min(50)
  height: string;

  @IsString()
  target: string;

  @IsNotEmpty()
  @IsString()
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
