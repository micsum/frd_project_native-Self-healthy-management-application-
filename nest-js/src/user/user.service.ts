import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { LoginData } from 'type';
import { checkPassword } from 'hash';

@Injectable()
export class UserService {
  //@ts-ignore
  constructor(@InjectKnex() private knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    //console.log('new', createUserDto); check the confirm password drop

    await this.knex('user').insert(createUserDto);
    return 'Successfully registered';
  }

  async checkDbUser(createUserDto: CreateUserDto) {
    let query = this.knex('user')
      .select('*')
      .where({ email: createUserDto.email })
      .orWhere({ username: createUserDto.username });

    let dbResult = await query;
    if (dbResult.length === 1) {
      return {
        error: 'User Existed.\n Please input another username / email.',
      };
    }
    return {};
  }

  async findAll(LoginData:LoginData) {
    const inputPassword = LoginData.password
    let query = this.knex('user')
      .select('*')
      .where({ email: LoginData.email })

    let dbResult = await query;
    let dbPassword = dbResult[0].password
    if (dbResult.length === 0) {
      return {
        error: 'User Not Exist.\n Please input correct email.',
      };
    }
    await checkPassword(inputPassword, dbPassword)?{success:
    "success"}:{error:"Wrong Password"}
  }


  
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
