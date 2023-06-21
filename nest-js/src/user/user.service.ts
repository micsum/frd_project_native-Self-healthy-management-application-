import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { LoginData } from './dto/login-user.dto';
import { checkPassword } from 'hash';
import { JWTService } from 'src/jwt/jwt.service';
import { TargetInputDTO } from './dto/targetInput.dto';

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

  async getBodyParams(userID: number) {
    return await this.knex('user')
      .select('height', 'weight')
      .where({ id: userID });
  }

  async getPersonalTarget(userID: number) {
    const personalTargetResult = await this.knex('personal_target_input')
      .select('*')
      .where({ user_id: userID });
    let personalTarget = personalTargetResult[0];
    const { start_date, expected_date } = personalTarget;
    personalTarget = {
      ...personalTarget,
      start_date: new Date(start_date.getTime() + 8 * 3600000),
      expected_date: new Date(expected_date.getTime() + 8 * 3600000),
    };
    return { personalTarget: [personalTarget] };
  }

  async updatePersonalTarget(userID: number, inputInfo: TargetInputDTO) {
    const targetInputResult = await this.knex('personal_target_input')
      .select('*')
      .where({ user_id: userID });

    if (targetInputResult.length !== 0) {
      await this.knex('personal_target_input').where({ user_id: userID }).del();
    }
    await this.knex('personal_target_input').insert({
      ...inputInfo,
      user_id: userID,
    });
    return {};
  }

  async updateStepsGoal(userID: number, goalInt: number) {
    const stepsGoalInDb = await this.knex('personal_target_input')
      .select('*')
      .where({ user_id: userID });

    if (stepsGoalInDb.length !== 0) {
      await this.knex('personal_target_input')
        .where({ user_id: userID })
        .update({ steps_dailygoal: goalInt });
    } else {
      await this.knex('personal_target_input').insert({
        steps_dailygoal: goalInt,
        user_id: userID,
      });
    }
    return {};
  }

  async getStepGoal(userID: number) {
    const getStep = await this.knex('personal_target_input')
      .select('steps_dailygoal')
      .where({ user_id: userID });
    return { getStep };
  }

  async getWeightInfo(userID: number) {
    return await this.knex('table_name')
      .select('weight', 'date')
      .where({ user_id: userID });
  }
}
