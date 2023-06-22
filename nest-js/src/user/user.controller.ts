import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  ValidationPipe,
  Header,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { LoginData } from './dto/login-user.dto';
import { hashPassword } from 'hash';
import { UpdateUserDto } from './dto/update-user.dto';
import { StepGoalDTO, TargetInputDTO } from './dto/targetInput.dto';
import { JWTService } from 'src/jwt/jwt.service';
import { JwtAuthGuard } from 'src/authguard/JwtAuthGuard.service';
import { WeightInfoDTO } from './dto/weightInput.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService,
  ) {}

  private extractUserID(token: string) {
    const trimmedToken = token.split(' ')[1];
    const decodedToken = this.jwtService.decodedJWT(trimmedToken);
    return typeof decodedToken === 'string' ? -1 : decodedToken.id;
  }

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
  @UseGuards(JwtAuthGuard)
  @Get('bodyParams')
  async getBodyParams(@Headers('authorization') token: string) {
    const userID = this.extractUserID(token);
    try {
      return await this.userService.getBodyParams(userID);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('personalTarget')
  async getPersonalTarget(@Headers('authorization') token: string) {
    const userID = this.extractUserID(token);
    try {
      return await this.userService.getPersonalTarget(userID);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }
  @UseGuards(JwtAuthGuard)
  @Post('personalTarget')
  async updatePersonalTarget(
    @Headers('authorization') token: string,
    @Body() targetInput: TargetInputDTO,
  ) {
    const userID = this.extractUserID(token);
    try {
      await this.userService.updatePersonalTarget(userID, targetInput);
      return {};
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('stepsGoal')
  async setStepsGoal(
    @Headers('Authorization') token: string,
    @Body() { goalInput }: StepGoalDTO,
  ) {
    const userID = this.extractUserID(token);
    const goalInt = parseInt(goalInput);
    try {
      await this.userService.updateStepsGoal(userID, goalInt);
      return {};
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('stepsGoal')
  async getStepGoal(@Headers('authorization') token: string) {
    const userID = this.extractUserID(token);
    try {
      return await this.userService.getStepGoal(userID);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('weightInfo')
  async getWeightInfo(@Headers('authorization') token: string) {
    const userID = this.extractUserID(token);
    try {
      return await this.userService.getWeightInfo(userID);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('weightInfo')
  async inputWeightInfo(
    @Headers('authorization') token: string,
    @Body() weightInputInfo: WeightInfoDTO,
  ) {
    const userID = this.extractUserID(token);
    try {
      return await this.userService.inputWeightInfo(userID, weightInputInfo);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }
}
