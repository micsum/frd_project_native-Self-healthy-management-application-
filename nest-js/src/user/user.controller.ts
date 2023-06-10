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
import { LoginData, SignUpData } from 'type';
import { hashPassword } from 'hash';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
   @UsePipes(new ValidationPipe())
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
      console.error('dtoDbcheck', error); //check dto or db error
      return { error: 'Server Error' };
    }
  }

  @Post('login')
  findAll(@Body() LoginData: LoginData) {
    this.userService.findAll();
    // console.log(LoginData); test LoginData
    return { success: true }; //res.json
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
}
