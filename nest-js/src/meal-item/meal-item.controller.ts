// Buffer Line
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MealItemService } from './meal-item.service';
import { CreateMealItemDto } from './dto/create-meal-item.dto';
import { UpdateMealItemDto } from './dto/update-meal-item.dto';

@Controller('mealItem')
export class MealItemController {
  constructor(private readonly mealItemService: MealItemService) {}

  @Get(':date')
  @UsePipes(new ValidationPipe())
  async retrieveMealItems(@Param('date') date: Date) {
    console.log(date);
    return {};
  }

  @Post(':date')
  @UsePipes(new ValidationPipe())
  async addNewItem(
    @Param() date: Date,
    @Body() foodItemBasicInfo: CreateMealItemDto,
  ) {
    console.log('controller', foodItemBasicInfo);
    try {
      return await this.mealItemService.createNewItem(date, foodItemBasicInfo);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async updateItem(@Body() foodItemFullInfo: UpdateMealItemDto) {
    console.log(foodItemFullInfo);
    return {};
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  async deleteItem(@Body() foodItemBasicInfo: CreateMealItemDto) {
    console.log('controller', foodItemBasicInfo);
    try {
      return await this.mealItemService.deleteExistingItem(foodItemBasicInfo);
    } catch (error) {
      console.log(error);
      return { error: 'Server Error' };
    }
  }
}
