import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectKnex, Knex } from 'nestjs-knex';

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

  findAll() {
    return `success`;
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
