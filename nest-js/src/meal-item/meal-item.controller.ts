// Buffer Line
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MealItemService } from './meal-item.service';
import { CreateMealItemDto } from './dto/create-meal-item.dto';
import { UpdateMealItemDto } from './dto/update-meal-item.dto';
import { JWTService } from 'src/jwt/jwt.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('mealItem')
export class MealItemController {
  constructor(
    private readonly mealItemService: MealItemService,
    private jwtService: JWTService,
  ) {}

  @Get(':token/:date')
  async retrieveMealItems(
    @Param('token') token: string,
    @Param('date') date: Date,
  ) {
    const dateString = date.toString().split('-');
    if (
      dateString.length !== 3 ||
      dateString[0].length !== 4 ||
      dateString[1].length !== 2 ||
      dateString[2].length !== 2 ||
      parseInt(dateString[1]) > 12 ||
      parseInt(dateString[1]) < 1 ||
      parseInt(dateString[2]) > 31 ||
      parseInt(dateString[2]) < 1
    ) {
      return { error: 'Inappropriate Date' };
    }

    const decodedToken = this.jwtService.decodedJWT(token);
    const userID = typeof decodedToken === 'string' ? -1 : decodedToken.id;

    if (userID === undefined || userID === -1) {
      return { error: 'User Not Found' };
    }

    try {
      return await this.mealItemService.getMealData(userID, date);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }

  @Post(':token/:date')
  async addNewItem(
    @Param('token') token: string,
    @Param('date') date: Date,
    @Body() foodItemBasicInfo: CreateMealItemDto,
  ) {
    const decodedToken = this.jwtService.decodedJWT(token);
    const userID = typeof decodedToken === 'string' ? -1 : decodedToken.id;

    if (userID === undefined || userID === -1) {
      return { error: 'User Not Found' };
    }

    try {
      return await this.mealItemService.createNewItem(
        userID,
        date,
        foodItemBasicInfo,
      );
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }

  @Put()
  async updateItem(@Body() foodItemFullInfo: UpdateMealItemDto) {
    try {
      return await this.mealItemService.updateExistingItem(foodItemFullInfo);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }

  @Delete()
  async deleteItem(@Body() foodItemBasicInfo: CreateMealItemDto) {
    try {
      return await this.mealItemService.deleteExistingItem(foodItemBasicInfo);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }

  @Get('nutritionDetail/:token/:date/:days')
  async getNutritionDetail(
    @Param('token') token: string,
    @Param('date') date: string,
    @Param('days') days: number,
  ) {
    const decodedToken = this.jwtService.decodedJWT(token);
    const userID = typeof decodedToken === 'string' ? -1 : decodedToken.id;

    if (userID === undefined || userID === -1) {
      return { error: 'User Not Found' };
    }

    try {
      return await this.mealItemService.getPastItemNutrition(
        userID,
        date,
        days,
      );
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }
}
