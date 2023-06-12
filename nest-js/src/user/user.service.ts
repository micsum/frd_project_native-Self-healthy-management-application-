import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { LoginData } from './dto/login-user.dto';
import { checkPassword } from 'hash';
import { JWTService } from 'src/jwt/jwt.service';

@Injectable()
export class UserService {
  constructor(
    //@ts-ignore
    @InjectKnex() private knex: Knex,
    private jwtService: JWTService,
  ) {}

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

  async findAll(LoginData: LoginData) {
    const inputPassword = LoginData.password;
    let dbResult = await this.knex('user')
      .select('*')
      .where({ email: LoginData.email });

    if (dbResult.length === 0) {
      return {
        error: 'User does not exist.\nPlease input correct email.',
      };
    }

    let dbPassword = dbResult[0].password;
    let id = dbResult[0].id;
    let email = dbResult[0].email;
    let payload = { email, id };

    return (await checkPassword(inputPassword, dbPassword))
      ? { token: this.jwtService.encodeJWT(payload) }
      : { error: 'Wrong Password' };
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
