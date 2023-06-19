import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { LoginData } from './dto/login-user.dto';
import { hashPassword } from 'hash';
import { UpdateUserDto } from './dto/update-user.dto';
import { TargetInputDTO } from './dto/targetInput.dto';
import { JWTService } from 'src/jwt/jwt.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService,
  ) {}

  @Post('signUp')
  async create(@Body() createUserDto: CreateUserDto) {
    //console.log('body', createUserDto); //check bodydata
    try {
      let checkDbUser = await this.userService.checkDbUser(createUserDto);
      if (checkDbUser.error) {
        return checkDbUser;
      }
      const userPassword = await hashPassword(createUserDto.password);
      createUserDto.password = userPassword;
      delete createUserDto.confirmPassword;
      await this.userService.create(createUserDto);
      return { message: 'Successfully registered' };
    } catch (error) {
      console.error('dtoDbCheck', error); //check dto or db error
      return { error: 'Server Error' };
    }
  }

  @Post('login')
  findAll(@Body() LoginData: LoginData) {
    try {
      //console.log(LoginData); //test LoginData
      return this.userService.findAll(LoginData);
    } catch (error) {
      console.error('dbServer', error);
      return { error: 'Server Error' };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('personalTarget/:token')
  async getPersonalTarget(@Param('token') token: string) {
    const decodedToken = this.jwtService.decodedJWT(token);
    const userID = typeof decodedToken === 'string' ? -1 : decodedToken.id;

    if (userID === undefined || userID === -1) {
      return { error: 'User Not Found' };
    }

    try {
      // await this.userService.getPersonalTarget(userID, targetInput);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }

  @Post('personalTarget/:token')
  async updatePersonalTarget(
    @Param('token') token: string,
    @Body() targetInput: TargetInputDTO,
  ) {
    const decodedToken = this.jwtService.decodedJWT(token);
    const userID = typeof decodedToken === 'string' ? -1 : decodedToken.id;

    if (userID === undefined || userID === -1) {
      return { error: 'User Not Found' };
    }

    try {
      await this.userService.updatePersonalTarget(userID, targetInput);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }
}
