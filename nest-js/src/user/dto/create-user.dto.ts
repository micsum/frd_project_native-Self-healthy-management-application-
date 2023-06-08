import { IsString, IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateUserDto {
  constructor(
    email: string,
    password: string,
    confirmPassword: string,
    weight: string,
    height: string,
    target: string,
  ) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.weight = weight;
    this.height = height;
    this.target = target;
  }
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmPassword: string;

  @IsNumberString()
  weight: string;
  @IsNumberString()
  height: string;

  @IsString()
  target: string;
}
