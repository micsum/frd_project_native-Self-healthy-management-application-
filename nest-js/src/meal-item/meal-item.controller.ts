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
  Headers,
} from '@nestjs/common';
import { MealItemService } from './meal-item.service';
import { CreateMealItemDto } from './dto/create-meal-item.dto';
import { UpdateMealItemDto } from './dto/update-meal-item.dto';
import { JWTService } from 'src/jwt/jwt.service';
import { JwtAuthGuard } from 'src/authguard/JwtAuthGuard.service';
import { FoodItemBasicInfo } from './utils/mealPageType';

@UseGuards(JwtAuthGuard)
@Controller('mealItem')
export class MealItemController {
  constructor(
    private readonly mealItemService: MealItemService,
    private jwtService: JWTService,
  ) {}

  private extractUserID(token: string) {
    const trimmedToken = token.split(' ')[1];
    const decodedToken = this.jwtService.decodedJWT(trimmedToken);
    return typeof decodedToken === 'string' ? -1 : decodedToken.id;
  }

  @Get(':date')
  async retrieveMealItems(
    @Param('date') date: Date,
    @Headers('authorization') token: string,
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

    const userID = this.extractUserID(token);
    try {
      return await this.mealItemService.getMealData(userID, date);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }

  @Post(':date')
  async addNewItem(
    @Headers('authorization') token: string,
    @Param('date') date: Date,
    @Body() foodItemBasicInfo: CreateMealItemDto,
  ) {
    const userID = this.extractUserID(token);

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
      console.log(foodItemFullInfo);
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

  @Get('nutritionDetail/:date/:days')
  async getNutritionDetail(
    @Headers('authorization') token: string,
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
