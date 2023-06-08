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
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginData } from 'type';
import { hashPassword } from 'hash';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    //console.log(createUserDto);
    try {
      let checkDbUser = await this.userService.checkDbUser(createUserDto);
      if (checkDbUser.error) {
        return checkDbUser.error;
      }
      const userPassword = await hashPassword(createUserDto.password);
      createUserDto.password = userPassword;
      return this.userService.create(createUserDto);
    } catch (error) {
      console.error(error);
      return error;
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
